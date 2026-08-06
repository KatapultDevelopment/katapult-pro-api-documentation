# Rate Limits & the Token Bucket

All REST APIs employ rate limits to ensure fair use and prevent abuse. v3 uses
two independent strategies. If you send too many requests, or run out of
tokens, you receive a response with HTTP status `429`.

1. [General rate limit](#general-rate-limit) — caps how *frequently* you can call.
2. [Token system](#token-system) — caps how *much* you can do per minute.

> **Running a large or long-running script?** Token capacity can be **smaller
> during busy/peak hours**, so schedule bulk and batch jobs for **off-peak /
> overnight** windows, and write them to **adapt to the balance they actually
> receive**. See [Peak hours & overnight batch jobs](#peak-hours--overnight-batch-jobs)
> and [Handling a smaller-than-expected refill](#handling-a-smaller-than-expected-refill).

## General rate limit

Each API key may make **at most 1 call per 50 milliseconds** (~20 calls/second).
Calls that arrive too quickly are rejected with HTTP `429` and the body:

```json
{ "error": "GENERAL RATE LIMIT EXCEEDED" }
```

> Note: this error is produced before your request reaches a route handler, so
> it uses the short `{ "error": ... }` shape and does **not** include a `meta`
> object. See [Responses & errors](concepts/responses-and-errors.md).

Keep a small delay (≥ 50 ms) between sequential calls.

## Token system

Each API key has its own **bucket** of tokens. Every call deducts a token cost
from the bucket, and the cost **scales with how much data the call consumes** — larger reads and bigger writes cost more (every call costs at least
1 token).

How it works:

- Each API key has an independent bucket. Limits are **per API key**.
- The bucket holds a default of **100,000 tokens**.
- The bucket **refills to full** once **60 seconds** have elapsed since its last
  refill. (It is a full reset, not a gradual drip.)
- Every response from a route handler includes a [`meta`](#reading-your-token-state)
  object with your current token state.

> **Token metering is currently advisory.** A depleted bucket is **not blocked
> today** — the call still succeeds and the response carries a
> [`token_warning`](#when-your-bucket-is-depleted). This metering will become
> **enforced** in the future, so build clients that respect the balance now
> rather than relying on requests going through once the bucket is empty.

### Average token costs

Because a call's cost depends on the volume of data it touches, there is no
single fixed price per endpoint. Instead, each endpoint publishes an **average
token cost** in its [endpoint reference](reference/) (the *Average token cost*
column).

> **Averages are guidance, not guarantees.** Each endpoint's published *Average
> token cost* is a typical figure — a given call can cost more or less than the
> average depending on how much data it moves, and **costs and the bucket size
> are subject to change**. Read your remaining balance from each response's
> `meta` instead of hardcoding numbers (see [below](#reading-your-token-state)).

As a rule of thumb: reads that return more data, and writes that change more
data, cost more. A broad list or a large write is far more expensive than a
single small read.

### Reading your token state

Every route-handler response (success **and** error) includes a `meta` object:

```json
{
  "status": "success",
  "data": { },
  "meta": {
    "token_count": 99990,
    "last_refill_time": 1718450000000
  }
}
```

- `token_count` — tokens remaining **after** this request.
- `last_refill_time` — epoch milliseconds of the bucket's last refill.
- `token_warning` — present **only** when the bucket is depleted; see
  [below](#when-your-bucket-is-depleted).

Your bucket refills 60 seconds after `last_refill_time`, so the next refill is
at `last_refill_time + 60000`.

> **Extended API access callers are unthrottled.** Their calls are not metered
> against a bucket, so `token_count` is informational only and their traffic is
> never limited. See [extended API access](reference/restricted.md#extended-api-access).

### When your bucket is depleted

Token metering is **advisory today**: a depleted bucket does **not** block the
call. The request is still served, `token_count` reports `0`, and the response
`meta` carries a `token_warning`:

```json
{
  "status": "success",
  "data": { },
  "meta": {
    "token_count": 0,
    "last_refill_time": 1718450000000,
    "token_warning": "Token bucket is depleted for this API key. This request was not limited, but usage should be reduced."
  }
}
```

Treat the warning as a signal to **slow down**: pause until your next refill
(`last_refill_time + 60000`) before continuing heavy work. When metering becomes
enforced, calls made against an empty bucket will instead be rejected with HTTP
`429` (`token_rate_limit_exceeded`), so writing your client to back off on the
warning now keeps it working later.

> **`server_busy` (HTTP `429`).** Independently of your own bucket, the API may
> shed load during periods of very high database pressure, returning `429` with
> type `server_busy` and a `Retry-After` header. Back off for the advertised
> interval and retry.

## Managing your token budget in your client

Because per-call costs vary with data volume and the bucket size may change (see
[below](#a-note-on-changing-limits)), build clients that adapt at runtime rather
than assuming fixed numbers:

1. **Read `meta` on every response.** Track `token_count` and `last_refill_time`.
2. **Look before you leap on expensive calls.** Before a call you expect to be
   costly (a broad list, a large write, a full model fetch), check that
   `token_count` has comfortable headroom; if not, wait until
   `last_refill_time + 60000`.
3. **Heed the warning.** On a `token_warning` (or a future
   `token_rate_limit_exceeded`), sleep until the next refill
   (`last_refill_time + 60000`), then continue. Use exponential backoff **with
   jitter** as a fallback if you don't have a fresh `meta`.
4. **Respect the general limit too.** Keep ≥ 50 ms between calls regardless of
   token balance.
5. **Spread big jobs across minutes.** With a bucket that refills each minute,
   size each minute's work to the balance you observe in `meta` — do fewer, or
   smaller, operations per window rather than draining the bucket in a burst.

### A note on changing limits

The token bucket is **dynamic**: the effective bucket size may be **reduced
during periods of high database load**, and server owners can configure the
default bucket size.

Practical implication: **treat the bucket size, refill cadence, and per-call
costs as values you read at runtime, not constants.** A client that keys off the
`meta.token_count` it actually receives will keep working as these limits
evolve; one that hardcodes a capacity may not.

### Handling a smaller-than-expected refill

Because the effective bucket size can change between refills, **do not assume a
refill restores the same capacity as last time.** Treat each refill as an
authoritative reset to whatever `token_count` you observe, and re-plan against
that number.

A refill has occurred whenever `last_refill_time` increases from the value you
last saw. When it does, read the new `token_count` and recompute your budget for
that window — if capacity came back smaller, shrink your batch size and/or widen
your delays:

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

- **Recompute, don't assume.** Derive each window's budget from the observed
  `token_count`, never from a hardcoded default.
- **Measure cost from `meta` deltas.** Since costs scale with data volume, infer
  a call's real cost from how much `token_count` dropped, not from a fixed table.
- **Adapt downward gracefully.** If a refill is smaller, do less this minute.
- **Don't carry size across runs.** A schedule computed yesterday against a
  larger bucket may overshoot today — recompute from live `meta` every run.

## Monthly token pool

Beyond the per-minute bucket, sustained API usage also draws on a **monthly pool
tied to your company's subscription** (**1,000,000 tokens per license**).
This is a separate, longer-horizon ceiling on total usage. Company admins are
notified as the pool nears its limit. The bucket state above governs minute-to-minute pacing, while
the monthly pool bounds heavy sustained use over a billing period.

## Peak hours & overnight batch jobs

Run large or token-heavy jobs — bulk creates/updates/deletes, full model
fetches, large exports — **during off-peak hours** (e.g. overnight for your
team's timezone). This helps in three ways:

- **Reduces backend load** during the busy part of the day, keeping the platform
  responsive for everyone (be a good citizen).
- **Avoids contention with interactive use** — your script won't compete with
  your team actively working in Katapult Pro.
- **Larger effective capacity off-peak** — under the dynamic-bucket system,
  low-load windows will generally afford more headroom than peak hours.

Additional tips:

- Use `GET /models/{modelKey}?paths=…` (path-scoped, max 10) rather than a full
  model fetch — a full fetch returns the entire model (far more data, far more
  costly) and requires extended access, so it is unavailable in production.
- Use query parameters that narrow results (e.g. `paths` on `GET /jobs/{job_id}`,
  `metadataFilter` on `GET /jobs`) to reduce calls and data — which now also
  reduces token cost.
- Cache rarely-changing data (like model definitions) instead of re-fetching.
- Batch and pace writes to stay within the per-minute budget rather than
  bursting into warnings.
