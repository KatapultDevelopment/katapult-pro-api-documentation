# Users

Read users in the caller's company.

<!-- BEGIN GENERATED: Users -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/users`](#list-all-users) | 1 | List all users |
| `GET` | [`/users/{user_id}`](#get-a-user) | 1 | Get a user |
| `GET` | [`/users/{user_id}/active_state`](#get-user-active-state) 🔒 | 1 | Get user active state |
| `POST` | [`/users/{user_id}/active_state`](#set-user-active-state) 🔒 | 10 | Set user active state |

### List all users

```sh
GET https://katapultpro.com/api/v3/users
```

**Token cost:** 1

Lists all users (including external users) in the caller's active company.

### Get a user

```sh
GET https://katapultpro.com/api/v3/users/{user_id}
```

**Token cost:** 1

Returns a user's core fields plus their attributes (`metadata`).

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `user_id` | string |  |

### Get user active state

> 🔒 **Restricted** — requires extended API access (disabled in production). See [restricted.md](restricted.md).

```sh
GET https://katapultpro.com/api/v3/users/{user_id}/active_state
```

**Token cost:** 1

Returns the active state of a specific user, including their last updated timestamp, the source of activity (`client` or `api`), the path of the last activity, and the page (`map` or `photos`). Returns `null` if no active state has been recorded. Requires extended API access and the `enable_api_user_state_calls` feature flag.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `user_id` | string |  |

### Set user active state

> 🔒 **Restricted** — requires extended API access (disabled in production). See [restricted.md](restricted.md).

```sh
POST https://katapultpro.com/api/v3/users/{user_id}/active_state
```

**Token cost:** 10

Sets the active state for a specific user. Sets `source` to `api` and `last_updated` to the current server time. Returns the new active state. Requires extended API access and the `enable_api_user_state_calls` feature flag. The caller must either be the user being updated or a company admin (otherwise 403 `forbidden`); the target user must exist (otherwise 404 `not_found`). Note that the target user's client only visually applies the new state if they have opted in to `allow_api_active_state` in their account settings — the first API-driven change prompts them to accept or deny.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `user_id` | string |  |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `path` | string | ✓ | The path to record as the user's last activity. Must start with `jobs/...`. |
| `page` | `map` \| `photos` | ✓ | Which page the activity occurred on. |

<!-- END GENERATED: Users -->
