# Users

Read users in the caller's company.

<!-- BEGIN GENERATED: Users -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/users`](#list-all-users) | 1 | List all users |
| `GET` | [`/users/{user_id}`](#get-a-user) | 1 | Get a user |
| `GET` | [`/users/{user_id}/active_state`](#get-user-active-state) 🔒 | 1 | Get user active state |
| `POST` | [`/users/{user_id}/active_state`](#set-user-active-state) 🔒 | 1 | Set user active state |

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

Returns the active state of a specific user, including their last updated timestamp, the source of activity (`client` or `api`), and the path of the last activity. Returns `null` if no active state has been recorded. Requires extended API access and the `enable_api_user_state_calls` feature flag.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `user_id` | string |  |

### Set user active state

> 🔒 **Restricted** — requires extended API access (disabled in production). See [restricted.md](restricted.md).

```sh
POST https://katapultpro.com/api/v3/users/{user_id}/active_state
```

**Token cost:** 1

Sets the active state for a specific user. Sets `source` to `api` and `last_updated` to the current server time. Returns the new active state. Requires extended API access and the `enable_api_user_state_calls` feature flag.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `user_id` | string |  |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `path` | string | ✓ | The path to record as the user's last activity. |

<!-- END GENERATED: Users -->
