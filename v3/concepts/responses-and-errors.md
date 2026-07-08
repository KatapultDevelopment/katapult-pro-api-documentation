# Responses & Errors

All v3 responses are JSON. Successful route-handler responses use HTTP `200`
and a standard envelope; errors use an error envelope. A small set of
authentication / middleware failures use a different, simpler shape — see
[Authentication & middleware errors](#authentication--middleware-errors).

## Success

For a single resource, `data` contains the resource:

```ts
type EntityResponse = {
  status: "success",
  data: {
    id: string, // Id of the resource
    // ...other resource fields
  },
  meta: {
    token_count: number,      // Tokens remaining after the request
    last_refill_time: number, // Epoch ms of the last token refill
  }
}
```

> For callers with [extended API access](../reference/restricted.md#extended-api-access),
> `token_count` is always the fixed placeholder integer `9999999999` instead of
> a real remaining count.

For a list, `data` is an array of resources:

```ts
type ListResponse = {
  status: "success",
  data: Array<{ id: string, /* ...fields */ }>,
  meta: { token_count: number, last_refill_time: number }
}
```

Some write endpoints (e.g. photo `associate`, raw job write) succeed with an
empty `data` object.

## Error

Errors thrown inside a route handler use the standard error envelope:

```ts
type ErrorResponse = {
  status: "error",
  message: string, // Human-readable message
  type: string,    // Machine-readable type (see table below)
  meta: { token_count: number, last_refill_time: number }
}
```

| HTTP | `type` | Cause |
| --- | --- | --- |
| 400 | `missing_parameter` | A required path/query parameter was missing. |
| 400 | `missing_required_field` | A required body field was missing. |
| 400 | `invalid_field` | A field had an invalid value (e.g. bad enum). |
| 400 | `invalid_id` | A user-supplied id failed the [ID requirements](resource-ids.md). |
| 400 | `invalid_file_type` | An uploaded file was not `image/jpeg`. |
| 400 | `invalid_request` | Generic request validation failure. |
| 400 | `invalid_timestamp` | A `start_time`/`end_time` was not valid ISO-8601 or Unix seconds. |
| 400 | `invalid_limit` | A `limit` query parameter was not a positive number. |
| 403 | `extended_access_required` | The endpoint requires extended API access. |
| 403 | `forbidden` | Requested a company that is not your own. |
| 404 | `not_found` | The requested resource does not exist. |
| 429 | `token_rate_limit_exceeded` | The token bucket was depleted. See [rate limits](../rate-limits.md). |
| 500 | `internal_error` | Unexpected server error. |

## Authentication & middleware errors

Failures that occur **before** your request reaches a route handler (bad/missing
API key, permission denied, the general rate limit) use a simpler shape with
only an `error` field and **no `meta`**:

```json
{ "error": "INVALID API KEY" }
```

| HTTP | `error` | Cause |
| --- | --- | --- |
| 400 | `MISSING API KEY` | No `api_key` query parameter was provided. |
| 401 | `INVALID API KEY` | The API key was not found. |
| 403 | `INVALID USER` | The user for the key was deleted or not found. |
| 403 | `PERMISSION DENIED` | The user lacks the `api_access` permission. |
| 429 | `GENERAL RATE LIMIT EXCEEDED` | Calls arrived faster than 1 per 50 ms. |
| 500 | `INTERNAL ERROR` | Server could not initialize. |

## Not implemented

Some endpoints are reserved but not yet available; they return HTTP `501` with
`{ "error": "NOT IMPLEMENTED" }`. See [Coming soon](../reference/coming-soon.md).
