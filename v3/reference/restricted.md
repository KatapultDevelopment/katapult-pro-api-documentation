# Restricted Endpoints

These endpoints exist but require **extended API access**, which is **disabled
in production**. They are documented for completeness; most integrations cannot
call them. Attempting to without extended access returns HTTP `403` with type
`extended_access_required`.

## Extended API access

Extended API access removes token costs (calls are charged 0 tokens), unlocks
the raw write endpoint, and permits full model fetches (see below). It is
granted only when **both** are true:

- The caller's company has the `can_grant_extended_api_access` feature enabled.
- The caller's user has the `extended_api_access` role.

It is always off in the production environment (`katapultpro.com`).

## Raw job write

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/raw
```

**Token cost:** 10 (0 with extended access) · **Requires extended API access**

Writes raw path/value data directly to a job, bypassing the higher-level
create/update helpers. Body keys are job-relative paths; values are written
as-is, and a `null` value deletes the path.

- **Allowed top-level keys:** `nodes`, `connections`, `photos`, `photo_summary`,
  `files`, `traces`, `compatible_units`, `warning_reports`.
- **Reserved keys** (`metadata`, `name`, `model`, `map_styles`, `sharing`) are
  rejected — use [`POST /jobs/{job_id}`](jobs.md#update-a-job) for those.
- Use a top-level key alone (e.g. `"nodes"`) to replace that whole branch, or a
  deeper path to write a specific value.

Example body:

```json
{
  "nodes/-Nabc.../attributes/note/-Ninst...": "set via raw write",
  "warning_reports/-Nold...": null
}
```

Writes that modify `nodes` or `connections` trigger geohash recomputation for
the job.

Returns HTTP `200` with an empty `data` object on success.

## Full model fetch

```sh
GET https://katapultpro.com/api/v3/models/{modelKey}
```

Unlike the raw write, [`GET /models/{modelKey}`](models.md) is only *partially*
restricted. A **full** model fetch — **no `paths`** query parameter — requires
extended API access; without it the request returns `403`
`extended_access_required`. A **path-scoped** fetch
(`?paths=attribute_groups,node_types`, max 10) is open to all callers and is the
supported way to read model data.

Because extended access is off in production, request `?paths=...` on
`katapultpro.com`. See [Models](models.md) and
[Rate limits & the token bucket](../rate-limits.md#token-costs).

## User active state

```sh
GET  https://katapultpro.com/api/v3/users/{user_id}/active_state
POST https://katapultpro.com/api/v3/users/{user_id}/active_state
```

**Token cost:** 1 · **Requires extended API access** · **Requires `enable_api_user_state_calls` feature flag**

### GET — Get user active state

Returns the active state of a specific user. The response `data` is `null` if
no active state has been recorded, otherwise an object with:

| Field | Type | Description |
| --- | --- | --- |
| `last_updated` | integer | Unix timestamp (ms) of the last activity. |
| `source` | `"client"` \| `"api"` | Whether the activity originated from the client app or the API. |
| `path` | string | The path of the last activity. |

### POST — Set user active state

Sets the active state for a specific user. `source` is always set to `"api"`
and `last_updated` is set to the current server time.

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `path` | string | ✓ | The path to record as the user's last activity. |

Returns the new active state in the same shape as the GET response.
