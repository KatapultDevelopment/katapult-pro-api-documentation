# Users

Read users in the caller's company. Listing users and reading another user's
record require **company admin**; you can always read your own record.

<!-- BEGIN GENERATED: Users -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/users`](#list-all-users) | TBD | List all users |
| `GET` | [`/users/{user_id}`](#get-a-user) | TBD | Get a user |
| `GET` | [`/users/{user_id}/active_state`](#get-user-active-state) 🔒 | TBD | Get user active state |
| `POST` | [`/users/{user_id}/active_state`](#set-user-active-state) 🔒 | TBD | Set user active state |

### List all users

```sh
GET https://katapultpro.com/api/v3/users
```

**Average token cost:** TBD

Lists all users (including external users) in the caller's active company. Requires the caller to be a **company admin**.

### Get a user

```sh
GET https://katapultpro.com/api/v3/users/{user_id}
```

**Average token cost:** TBD

Returns a user's core fields plus their attributes (`metadata`). You can always read your **own** record; reading **another user's** record requires the caller to be a **company admin**.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `user_id` | string | Id of the user. |

### Get user active state

> 🔒 **Restricted** — requires extended API access (disabled in production). See [restricted.md](restricted.md).

```sh
GET https://katapultpro.com/api/v3/users/{user_id}/active_state
```

**Average token cost:** TBD

Returns the active state of a specific user, including their last updated timestamp, the source of activity (`client` or `api`), the path of the last activity, and the page (`map` or `photos`). Returns `null` if no active state has been recorded. Requires extended API access and the `enable_api_user_state_calls` feature flag.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `user_id` | string | Id of the user. |

### Set user active state

> 🔒 **Restricted** — requires extended API access (disabled in production). See [restricted.md](restricted.md).

```sh
POST https://katapultpro.com/api/v3/users/{user_id}/active_state
```

**Average token cost:** TBD

Sets the active state for a specific user. Sets `source` to `api` and `last_updated` to the current server time. Returns the new active state. Requires extended API access and the `enable_api_user_state_calls` feature flag. The caller must either be the user being updated or a company admin (otherwise 403 `forbidden`); the target user must exist (otherwise 404 `not_found`). Note that the target user's client only visually applies the new state if they have opted in to `allow_api_active_state` in their account settings — the first API-driven change prompts them to accept or deny.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `user_id` | string | Id of the user. |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `path` | string | ✓ | The path to record as the user's last activity. Always starts with `jobs/{job_id}/`; the exact shape depends on the entity. See [Activity paths](#activity-paths). |
| `page` | `map` \| `photos` | ✓ | The page to apply the user state change to. |

<!-- END GENERATED: Users -->

## Activity paths

The `path` field records **where** in a job the user is working. It always
starts with `jobs/{job_id}/`, and for every entity except a marker it mirrors
that resource's REST endpoint with the leading slash removed. Pair `path` with
the `page` the entity is shown on: `map` for map entities (nodes, connections,
sections) and `photos` for photo entities (photos and markers).

| Entity | `path` template | `page` |
| --- | --- | --- |
| Node | `jobs/{job_id}/nodes/{node_id}` | `map` |
| Connection | `jobs/{job_id}/connections/{connection_id}` | `map` |
| Section | `jobs/{job_id}/connections/{connection_id}/sections/{section_id}` | `map` |
| Photo | `jobs/{job_id}/photos/{photo_id}` | `photos` |
| Marker | `jobs/{job_id}/photos/{photo_id}/photofirst_data/{marker_type}/{marker_path}/{marker_id}` | `photos` |

Every template except **Marker** is a REST resource path with the leading `/`
dropped — see [Nodes](nodes.md), [Connections](connections.md),
[Sections](sections.md), and [Photos](photos.md). A **marker** is a PhotoFirst
annotation stored under a photo's `photofirst_data`; it has no REST endpoint, so
its path is built from the photo path plus the marker's internal location:
`{marker_type}` is the annotation category, `{marker_path}` locates it within
that category, and `{marker_id}` is the marker's id.

### Examples

Node on the map:

```json
{ "path": "jobs/-O_jobAbc123/nodes/-O_node01", "page": "map" }
```

Connection on the map:

```json
{ "path": "jobs/-O_jobAbc123/connections/-O_conn01", "page": "map" }
```

Section on the map:

```json
{ "path": "jobs/-O_jobAbc123/connections/-O_conn01/sections/-O_sec01", "page": "map" }
```

Photo:

```json
{ "path": "jobs/-O_jobAbc123/photos/-O_photo01", "page": "photos" }
```

Marker on a photo (replace the `photofirst_data` segments with the marker's real
values):

```json
{ "path": "jobs/-O_jobAbc123/photos/-O_photo01/photofirst_data/{marker_type}/{marker_path}/{marker_id}", "page": "photos" }
```

A `path` that does not start with `jobs/` is rejected with `400`
[`invalid_request`](../concepts/responses-and-errors.md).
