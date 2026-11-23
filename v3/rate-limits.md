# Rate Limits & Tokens

The API measures usage in **tokens**. Every call costs tokens, and the cost **scales with how much
data the call reads and writes** (every call costs at least 1 token). Usage is limited in two ways:

| Limit | Scope | Resets | When exceeded |
| --- | --- | --- | --- |
| [Per-minute token bucket](#per-minute-token-bucket) | Each API key | 60 seconds after its last refill | **Not blocked today** — you get a [`token_warning`](#when-your-bucket-is-depleted) |
| [Monthly token limit](#monthly-token-limit) | Your whole company | The 1st of each month | **Blocked** — HTTP `429` `company_monthly_token_limit_exceeded` |

During very high database load, the API may also reject requests with HTTP `429` and type
[`server_busy`](#server-busy).

Both limits count v2 and v3 API usage, and both are tracked **separately on each server**.

> **Running a large or long-running script?** Per-minute capacity can be **smaller during
> busy/peak hours**, so schedule bulk and batch jobs for **off-peak / overnight** windows, write them
> to **adapt to the balance they actually receive**, and check that your company has enough
> [monthly tokens](#monthly-token-limit) left before you start. See
> [Peak hours & overnight batch jobs](#peak-hours--overnight-batch-jobs) and
> [Handling a smaller-than-expected refill](#handling-a-smaller-than-expected-refill).

## Token costs

Because a call's cost depends on the volume of data it touches, there is no single fixed price per
endpoint. Instead, each endpoint publishes an **average token cost** in its
[endpoint reference](reference/) (the *Average token cost* column).

> **Averages are guidance, not guarantees.** A given call can cost more or less than the average
> depending on how much data it moves, and **costs and limits are subject to change**. Read your
> balances from each response's `meta` instead of hardcoding numbers (see
> [below](#reading-your-token-state)).

As a rule of thumb: reads that return more data, and writes that change more data, cost more. A
broad list or a large write is far more expensive than a single small read.

Requests that are rejected before they run — for example authentication errors, `server_busy`, or
[`company_monthly_token_limit_exceeded`](#when-the-monthly-limit-is-reached) — are not charged.

## Reading your token state

Responses from API endpoints include a `meta` object with your token state:

```json
{
  "status": "success",
  "data": { },
  "meta": {
    "token_count": 99990,
    "last_refill_time": 1718450000000,
    "company_tokens_remaining": 4873120
  }
}
```

- `token_count` — tokens left in **this API key's** per-minute bucket after this request.
- `last_refill_time` — epoch milliseconds of the bucket's last refill. The next refill is at
  `last_refill_time + 60000`.
- `company_tokens_remaining` — tokens **your company** has left this month after this request, across
  all of its API keys.
- `token_warning` — present **only** when the per-minute bucket is depleted; see
  [below](#when-your-bucket-is-depleted).

Treat these fields as optional. Some responses — such as authentication errors and requests rejected
before they run — don't include them.

## Per-minute token bucket

Each API key has its own **bucket** of tokens that paces minute-to-minute usage:

- Each API key has an independent bucket. If you use the same key with both v2 and v3, both draw
  from the same bucket.
- The bucket holds a default of **100,000 tokens**.
- The bucket **refills to full** once **60 seconds** have elapsed since its last refill. (It is a
  full reset, not a gradual drip.)

> **The per-minute bucket is currently advisory.** A depleted bucket is **not blocked today** — the
> call still succeeds and the response carries a [`token_warning`](#when-your-bucket-is-depleted).
> This will become **enforced** in the future, so build clients that respect the balance now. (The
> [monthly token limit](#monthly-token-limit) is already enforced.)

> **Extended API access** keys skip the bucket's upfront check and never receive a bucket warning,
> but their calls are still charged, so `token_count` still goes down. They are still subject to the
> monthly token limit and `server_busy`. See
> [extended API access](reference/restricted.md#extended-api-access).

### When your bucket is depleted

A depleted bucket does **not** block the call today. The request is still served, `token_count`
reports `0`, and the response `meta` carries a `token_warning`:

```json
{
  "status": "success",
  "data": { },
  "meta": {
    "token_count": 0,
    "last_refill_time": 1718450000000,
    "company_tokens_remaining": 4873120,
    "token_warning": "Token bucket is depleted for this API key. This request was not limited, but usage should be reduced."
  }
}
```

Treat the warning as a signal to **slow down**: pause until your next refill
(`last_refill_time + 60000`) before continuing heavy work. When the bucket becomes enforced, calls
made against an empty bucket will instead be rejected with HTTP `429` (`token_rate_limit_exceeded`),
so backing off on the warning now keeps your client working later.

### A note on changing limits

The per-minute bucket is **dynamic**: its effective size may be **reduced during periods of high
database load**, and server owners can configure the default bucket size.

Practical implication: **treat the bucket size, refill cadence, and per-call costs as values you
read at runtime, not constants.** A client that keys off the `meta.token_count` it actually receives
will keep working as these limits evolve; one that hardcodes a capacity may not.

### Handling a smaller-than-expected refill

Because the effective bucket size can change between refills, **do not assume a refill restores the
same capacity as last time.** Treat each refill as an authoritative reset to whatever `token_count`
you observe, and re-plan against that number.

A refill has occurred whenever `last_refill_time` increases from the value you last saw. When it
does, read the new `token_count` and recompute your budget for that window — if capacity came back
smaller, shrink your batch size and/or widen your delays:

```text
state: lastRefillSeen = 0, budgetThisWindow = 0

on each response (success OR warning), read response.meta:
    refill = meta.last_refill_time
    count  = meta.token_count
    if refill != lastRefillSeen:            # a new refill window started
        lastRefillSeen   = refill
        budgetThisWindow = count            # plan against ACTUAL capacity observed
        # scale the work attempted this minute to budgetThisWindow, e.g.:
        #   estimate each operation's cost from recent meta deltas (costs vary by
        #   data volume), then cap operations so their total stays under budget.
        #   if budgetThisWindow is small -> lower concurrency / raise inter-call delay
    # before an expensive call: if budgetThisWindow looks too low, wait until
    #   (lastRefillSeen + 60000), then re-read meta from the next response.
```

Key rules:

- **Recompute, don't assume.** Derive each window's budget from the observed `token_count`, never
  from a hardcoded default.
- **Measure cost from `meta` deltas.** Since costs scale with data volume, infer a call's real cost
  from how much `token_count` dropped, not from a fixed table.
- **Adapt downward gracefully.** If a refill is smaller, do less this minute.
- **Don't carry size across runs.** A schedule computed yesterday against a larger bucket may
  overshoot today — recompute from live `meta` every run.

## Monthly token limit

Each company has a monthly token limit of **1,000,000 tokens per license**:

- The limit is **shared by all of your company's API keys**, across v2 and v3.
- Usage **resets on the 1st of each month** (midnight Eastern Time).
- Usage and limits are tracked **separately on each server**, based on your company's license count
  on that server.
- Every charged response reports your remaining balance in
  [`company_tokens_remaining`](#reading-your-token-state).

Company admins are emailed when usage reaches **75%, 90%, and 100%** of the limit.

### When the monthly limit is reached

Once your company's usage reaches its limit, **requests are rejected** until the limit resets:

```json
{
  "status": "error",
  "message": "Your company's monthly API token limit has been reached. The limit resets at the start of next month (Eastern Time).",
  "type": "company_monthly_token_limit_exceeded",
  "meta": {
    "company_monthly_token_usage": 2000431,
    "company_monthly_token_limit": 2000000,
    "company_tokens_remaining": 0
  }
}
```

- **Do not retry these requests** before the 1st of the month. Unlike `server_busy`, waiting a few
  seconds will not help, and no `Retry-After` header is sent.
- The limit is checked before a request runs. A request that is already allowed through is completed
  and charged in full, so your company's usage can end up slightly above the limit.
- Some companies are exempt from the monthly limit by arrangement. Their requests are not blocked,
  but `company_tokens_remaining` still reports usage against the limit.

## Server busy

Independently of your own limits, the API may shed load during periods of very high database
pressure, returning HTTP `429` with type `server_busy` and a `Retry-After` header. Back off for the
advertised interval and retry.

## Managing your token budget in your client

Because per-call costs vary with data volume and limits may change, build clients that adapt at
runtime rather than assuming fixed numbers:

1. **Read `meta` on every response.** Track `token_count`, `last_refill_time`, and
   `company_tokens_remaining`.
2. **Check your monthly balance before big jobs.** Make sure `company_tokens_remaining` comfortably
   covers the job, and stop cleanly if it gets low rather than failing partway through.
3. **Look before you leap on expensive calls.** Before a call you expect to be costly (a broad list, a
   large write, a full model fetch), check that `token_count` has comfortable headroom; if not, wait
   until `last_refill_time + 60000`.
4. **Handle each `429` by its `type`:**
   - `server_busy` — wait for the `Retry-After` interval, then retry.
   - `token_rate_limit_exceeded` (future) — wait until the next refill (`last_refill_time + 60000`),
     then retry.
   - `company_monthly_token_limit_exceeded` — stop; do not retry until the 1st of the month.
5. **Heed the warning.** On a `token_warning`, sleep until the next refill, then continue. Use
   exponential backoff **with jitter** as a fallback if you don't have a fresh `meta`.
6. **Spread big jobs across minutes.** Size each minute's work to the balance you observe in `meta` —
   do fewer, or smaller, operations per window rather than draining the bucket in a burst.

## Peak hours & overnight batch jobs

Run large or token-heavy jobs — bulk creates/updates/deletes, full model fetches, large exports —
**during off-peak hours** (e.g. overnight for your team's timezone). This helps in three ways:

- **Reduces backend load** during the busy part of the day, keeping the platform responsive for
  everyone (be a good citizen).
- **Avoids contention with interactive use** — your script won't compete with your team actively
  working in Katapult Pro.
- **Larger per-minute capacity off-peak** — under the dynamic-bucket system, low-load windows will
  generally afford more headroom than peak hours.

Running off-peak does **not** reduce what a job costs against your
[monthly token limit](#monthly-token-limit) — the same work uses the same tokens at any time of day.

Additional tips:

- Use `GET /models/{modelKey}?paths=…` (path-scoped, max 10) rather than a full model fetch — a full
  fetch returns the entire model (far more data, far more costly) and requires extended access, so it
  is unavailable in production.
- Use query parameters that narrow results (e.g. `paths` on `GET /jobs/{job_id}`, `metadataFilter` on
  `GET /jobs`) to reduce calls and data — which also reduces token cost.
- Cache rarely-changing data (like model definitions) instead of re-fetching.
- Batch and pace writes to stay within the per-minute budget rather than bursting into warnings.