# Getting started

This guide gets you from zero to your first authenticated request against the
Katapult Pro API v3. You will generate an API key, make the welcome call,
authenticate every request, learn to read the token `meta` on each response, and
find out where to go next.

- **Base URL:** `https://katapultpro.com/api/v3`
- **Authentication:** API key, passed as the `api_key` query parameter.

## 1. Generate an API key

Generate a key from the **API Key** widget on the Katapult Pro home page. Each
key has its own token bucket and rate limit, so treat it like a password — keep
it out of source control and out of shared logs.

The examples below use `YOUR_API_KEY` as a placeholder; substitute your real
key.

## 2. Make the welcome call

The welcome endpoint (`GET /`) is the quickest way to confirm a key
authenticates. It is not charged against your token bucket, so you can call it freely.

```sh
curl "https://katapultpro.com/api/v3?api_key=YOUR_API_KEY"
```

```json
{ "status": "success", "message": "Welcome to the Katapult Pro API V3" }
```

If the key is missing or wrong, you get an authentication error instead. These
middleware errors use a short `{ "error": ... }` shape (and, unlike route
responses, carry no `meta`):

```json
{ "error": "INVALID API KEY" }
```

## 3. Authenticate every request

Every endpoint takes your key as the `api_key` query parameter. There are no
headers or tokens to manage — just append `api_key` to the URL. For example, to
list your jobs:

```sh
curl "https://katapultpro.com/api/v3/jobs?api_key=YOUR_API_KEY"
```

```json
{
  "status": "success",
  "data": [
    { "id": "-O_jobAbc123", "status": "active", "metadata": { "city": "Buffalo" } }
  ],
  "meta": { "token_count": 9999, "last_refill_time": 1718450000000 }
}
```

Successful route responses follow the same envelope: a `status` of `success`,
the payload under `data`, and a `meta` object.

## 4. Read the token `meta` on every response

Every response from a route handler — both successes **and** errors — includes a
`meta` object describing your token-bucket state:

```json
"meta": { "token_count": 9999, "last_refill_time": 1718450000000 }
```

- `token_count` — tokens remaining **after** this request.
- `last_refill_time` — epoch milliseconds of the bucket's last refill. Your
  bucket refills 60 seconds later, at `last_refill_time + 60000`.

Read `meta` on every response and let it drive your client's pacing rather than
hardcoding limits. Per-call costs scale with how much data a call reads or
writes, and both costs and the bucket size are subject to change. Token metering
is currently advisory — if you exhaust the bucket the request is still served
but `meta` carries a `token_warning`; compute how long to wait for a refill from
`meta`:

```
wait_ms = max(0, (last_refill_time + 60000) - now)
```

The only response shape that omits `meta` is a middleware-level failure (a bad
key, or the general rate limit — at most 1 call per 50 ms), because those are
rejected before a route handler runs.

See [Rate limits & the token bucket](../rate-limits.md) for average token costs,
refill behavior, and client guidance.

## Where to go next

- [Building a job](building-a-job.md) — a hands-on curl walkthrough: create a
  job, add nodes, connect them, add a midpoint section, and read it back.
- [Working with photos](working-with-photos.md) — upload photos, get signed
  download URLs, add photo elements and calibration anchors, and associate
  photos.
- [Jobs reference](../reference/jobs.md) — the full set of job endpoints,
  parameters, and token costs.
- [Rate limits & the token bucket](../rate-limits.md) — how to pace heavy or
  token-intensive scripts.
- [Code examples](../ApiExamples/) — runnable Node.js and Python examples
  for every endpoint.
