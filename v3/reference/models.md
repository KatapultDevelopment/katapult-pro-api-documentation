# Models

Read model options and model data.

> **Full model fetch requires extended API access.** A full fetch
> (`GET /models/{modelKey}` with no `paths`) returns `403`
> [`extended_access_required`](../concepts/responses-and-errors.md) without it,
> and since [extended access](restricted.md) is **off in production**, a full
> fetch is **unavailable on `katapultpro.com`**. Request specific `paths`
> (max 10) instead — this is how most integrations read model data. A full fetch
> returns the entire model, so it costs far more than a path-scoped fetch. See
> [Rate limits & the token bucket](../rate-limits.md#average-token-costs).

Full-model vs `paths` fetches differ in both behavior and cost — see
[Complex & codependent parameters](../concepts/complex-parameters.md#fetching-model-data-full-vs-paths).

<!-- BEGIN GENERATED: Models -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/models`](#get-model-options) | TBD | Get model options |
| `GET` | [`/models/{modelKey}`](#get-model-data) | TBD | Get model data |

### Get model options

```sh
GET https://katapultpro.com/api/v3/models
```

**Average token cost:** TBD

Returns the caller's available model keys/options.

### Get model data

```sh
GET https://katapultpro.com/api/v3/models/{modelKey}
```

**Average token cost:** TBD

Returns model data. With `paths`, only the requested sub-paths are returned (maximum 10 paths), so the request's cost scales with how much data those paths contain. With no `paths`, the full model is returned — this requires extended API access (otherwise 403 `extended_access_required`) and, since extended access is off in production, is unavailable on katapultpro.com; request `paths` instead. See `../rate-limits.md` and `../reference/restricted.md`.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `modelKey` | string | The model key. Must not contain `/`. |

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `paths` | string | Comma-separated list of sub-paths to return (maximum 10). |

<!-- END GENERATED: Models -->
