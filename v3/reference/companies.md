# Companies

Company-scoped, read-only endpoints for action tracking.

**You can only query your own company.** The `{company_id}` in the path must be
your own **company id** (your user group); requesting any other company returns
`403` with type [`forbidden`](../concepts/responses-and-errors.md). Your company
id, user id, and email are shown in the **API Key** widget on the Katapult Pro
home page.

How the two endpoints fit together:

- **Action models** describe *what* can be tracked — the configured action
  groups and the actions within them. Each action has an `action_id` and an
  `action_name`.
- **Tracked actions** are the recorded *occurrences*. Filter them by the
  `action_id` / `action_name` from action models, by `job_id`, by `uid` (the
  **User ID** from the API Key widget), by `value`, and by a `timestamp` range
  (`start_time` / `end_time`). Results are newest-first and paginated (max 200
  per request).

`start_time` and `end_time` accept either an ISO-8601 string
(e.g. `2026-06-01T00:00:00Z`) or Unix seconds; both bounds are inclusive. Token
costs and the per-minute bucket are described in
[Rate limits & the token bucket](../rate-limits.md).

Each tracked-action record may include a `source` field (`desktop`, `mobile`,
or `api`) identifying which client recorded the action. It is absent on older
records that predate source tracking.

<!-- BEGIN GENERATED: Companies -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/companies/{company_id}/tracked_actions`](#list-tracked-actions) | 1 | List tracked actions |
| `GET` | [`/companies/{company_id}/action_models`](#list-action-models) | 1 | List action models |

### List tracked actions

```sh
GET https://katapultpro.com/api/v3/companies/{company_id}/tracked_actions
```

**Average token cost:** 1

Returns a paginated list of tracked-action records for your company, newest first (ordered by `timestamp` descending). All filters are optional and combine with AND. `action_id`/`action_name` come from the action models endpoint; `uid` is the User ID shown in the API Key widget.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `company_id` | string | Your company id. Must match your own user group; other companies return 403. |

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `uid` | string | Filter by the user id that recorded the action. |
| `job_id` | string | Filter by job id. |
| `action_id` | string | Filter by action id (see `action_models`). |
| `action_name` | string | Filter by action name (see `action_models`). |
| `value` | string | Filter by the recorded value. |
| `start_time` | string | Inclusive lower bound on `timestamp`. ISO-8601 (e.g. `2026-06-01T00:00:00Z`) or Unix seconds. |
| `end_time` | string | Inclusive upper bound on `timestamp`. ISO-8601 or Unix seconds. |
| `limit` | integer | Maximum records to return. Capped at 200. |

### List action models

```sh
GET https://katapultpro.com/api/v3/companies/{company_id}/action_models
```

**Average token cost:** 1

Returns your company's action-tracking configuration: the action groups and the individual actions within each. Use the returned `action_id` / `action_name` values to filter the tracked actions endpoint.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `company_id` | string | Your company id. Must match your own user group; other companies return 403. |

<!-- END GENERATED: Companies -->
