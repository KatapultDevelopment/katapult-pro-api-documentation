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
from the bucket. When the bucket cannot cover a call's cost, that call is
blocked with HTTP `429` until the bucket refills.

How it works:

- Each API key has an independent bucket. Limits are **per API key**.
- The bucket holds a default of **10,000 tokens**.
- The bucket **refills to full** once **60 seconds** have elapsed since its last
  refill. (It is a full reset, not a gradual drip.)
- Every response from a route handler includes a [`meta`](#reading-your-token-state)
  object with your current token state.

### Token costs

Costs are assigned per call; calls that touch more data cost more. **Costs and
the bucket size are current values and are subject to change** — do not hardcode
them. Read your remaining balance from each response's `meta` instead (see
[below](#reading-your-token-state)).

| Call | Token cost |
| --- | --- |
| Welcome (`GET /`) | 0 |
| Any `GET` (jobs, nodes, photos, traces, users, …) | 1 |
| Any `POST` or `DELETE` (jobs, nodes, photos, …) | 10 |
| `GET /models` (model options) | 100 |
| `GET /models/{modelKey}` with `paths` | 1,000 per path (max 10 paths) |
| `GET /models/{modelKey}` without `paths` (full model) | 9,900 — extended access only (see note) |

> A full model fetch (no `paths`) **requires [extended API access](reference/restricted.md)**,
> which is off in production — so on `katapultpro.com` it returns `403`
> `extended_access_required`. Request specific `paths` (1,000 each) instead.
> When permitted, a full fetch costs **9,900** tokens — nearly the entire
> default bucket in a single call.

### Reading your token state

Every route-handler response (success **and** error) includes a `meta` object:

```json
{
  "status": "success",
  "data": { },
  "meta": {
    "token_count": 9990,
    "last_refill_time": 1718450000000
  }
}
```

- `token_count` — tokens remaining **after** this request. For callers with
  [extended API access](reference/restricted.md#extended-api-access), this is
  always the fixed placeholder integer `9999999999`, since their bucket never
  meaningfully depletes.
- `last_refill_time` — epoch milliseconds of the bucket's last refill.

Your bucket refills 60 seconds after `last_refill_time`, so the next refill is
at `last_refill_time + 60000`.

> `token_count` is always a plain integer. Extended API access callers simply
> see the fixed placeholder `9999999999` rather than a real remaining count.

### When you run out of tokens

A blocked call returns HTTP `429` with the standard error envelope:

```json
{
  "status": "error",
  "message": "Token rate limit exceeded for API key starting with: abcd1234",
  "type": "token_rate_limit_exceeded",
  "meta": { "token_count": 0, "last_refill_time": 1718450000000 }
}
```

**There is no `Retry-After` header.** Compute the wait yourself from `meta`:

```
wait_ms = max(0, (last_refill_time + 60000) - now)
```

## Managing refills in your client

Because token costs vary and the bucket size may change (see
[below](#a-note-on-changing-limits)), build clients that adapt at runtime rather
than assuming fixed numbers:

1. **Read `meta` on every response.** Track `token_count` and `last_refill_time`.
2. **Look before you leap on expensive calls.** Before a costly call (e.g. a full
   model fetch at 9,900), check that `token_count` covers it; if not, wait until
   `last_refill_time + 60000`.
3. **Back off on `429`.** On `token_rate_limit_exceeded`, sleep until the next
   refill (`last_refill_time + 60000`), then retry. Since there is no
   `Retry-After`, use exponential backoff **with jitter** as a fallback if you
   don't have a fresh `meta`.
4. **Respect the general limit too.** Keep ≥ 50 ms between calls regardless of
   token balance.
5. **Spread big jobs across minutes.** With a 10,000-token bucket refilling each
   minute, a bulk write of N entities (10 tokens each) needs roughly
   `ceil(N / 1000)` minutes. Pace the work accordingly.

### A note on changing limits

The token bucket is being made **dynamic**: the effective bucket size may be
**reduced during periods of high database load**. This system is still being
finalized, so this page intentionally avoids promising fixed capacity over time.

Practical implication: **treat the bucket size, refill cadence, and per-call
costs as values you read at runtime, not constants.** A client that keys off the
`meta.token_count` it actually receives will keep working as these limits
evolve; one that hardcodes "10,000 per minute" may not.

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

on each response (success OR 429), read response.meta:
    refill = meta.last_refill_time
    count  = meta.token_count
    if refill != lastRefillSeen:            # a new refill window started
        lastRefillSeen   = refill
        budgetThisWindow = count            # plan against ACTUAL capacity, not 10,000
        # scale the work attempted this minute to budgetThisWindow, e.g.:
        #   maxWritesThisWindow = floor(budgetThisWindow / 10)   # POST/DELETE cost 10
        #   if budgetThisWindow is small -> lower concurrency / raise inter-call delay
    # before each call: if budgetThisWindow < callCost, wait until
    #   (lastRefillSeen + 60000), then re-read meta from the next response.
```

Key rules:

- **Recompute, don't assume.** Derive each window's budget from the observed
  `token_count`, never from a hardcoded default.
- **Adapt downward gracefully.** If a refill is smaller, do less this minute
  rather than bursting into `429`s.
- **Don't carry size across runs.** A schedule computed yesterday against a
  larger bucket may overshoot today — recompute from live `meta` every run.

## Peak hours & overnight batch jobs

Run large or token-heavy jobs — bulk creates/updates/deletes, full model
fetches, large exports — **during off-peak hours** (e.g. overnight for your
team's timezone). This helps in three ways:

- **Reduces backend load** during the busy part of the day, keeping the platform
  responsive for everyone (be a good citizen).
- **Avoids contention with interactive use** — your script won't compete with
  your team actively working in Katapult Pro.
- **Larger effective capacity off-peak** — under the forthcoming dynamic-bucket
  system, low-load windows will generally afford more headroom than peak hours.

Additional tips:

- Use `GET /models/{modelKey}?paths=…` (1,000/path) — a full model fetch
  (9,900) requires extended access and is unavailable in production.
- Use query parameters that narrow results (e.g. `paths` on `GET /jobs/{job_id}`,
  `metadataFilter` on `GET /jobs`) to reduce calls and data.
- Cache rarely-changing data (like model definitions) instead of re-fetching.
- Batch and pace writes to stay within the per-minute budget rather than
  bursting into `429`s.
