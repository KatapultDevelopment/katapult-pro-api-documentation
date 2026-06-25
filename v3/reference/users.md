# Users

Read users in the caller's company.

<!-- BEGIN GENERATED: Users -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/users`](#list-all-users) | 1 | List all users |
| `GET` | [`/users/{user_id}`](#get-a-user) | 1 | Get a user |

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

<!-- END GENERATED: Users -->
