# Models

Read model options and model data.

> **Full model fetch requires extended API access.** A full fetch
> (`GET /models/{modelKey}` with no `paths`) returns `403`
> [`extended_access_required`](../concepts/responses-and-errors.md) without it,
> and since [extended access](restricted.md) is **off in production**, a full
> fetch is **unavailable on `katapultpro.com`**. Request specific `paths`
> (1,000 tokens each, max 10) instead — this is how most integrations read model
> data. A full fetch (when permitted) costs **9,900 tokens**. See
> [Rate limits & the token bucket](../rate-limits.md#token-costs).

Full-model vs `paths` fetches differ in both behavior and cost — see
[Complex & codependent parameters](../concepts/complex-parameters.md#fetching-model-data-full-vs-paths).

<!-- BEGIN GENERATED: Models -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/models`](#get-model-options) | 100 | Get model options |
| `GET` | [`/models/{modelKey}`](#get-model-data) | 9900 (full) \| 1000 per path (max 10) | Get model data |

### Get model options

```sh
GET https://katapultpro.com/api/v3/models
```

**Token cost:** 100

Returns the caller's available model keys/options.

### Get model data

```sh
GET https://katapultpro.com/api/v3/models/{modelKey}
```

**Token cost:** 9900 (full) \| 1000 per path (max 10)

Returns model data. With `paths`, only the requested sub-paths are returned and the request costs 1000 tokens per path (maximum 10 paths). With no `paths`, the full model is returned — this requires extended API access (otherwise 403 `extended_access_required`) and, since extended access is off in production, is unavailable on katapultpro.com; request `paths` instead. See `../rate-limits.md` and `../reference/restricted.md`.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `modelKey` | string | The model key. Must not contain `/`. |

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `paths` | string | Comma-separated list of sub-paths to return (maximum 10). |

<!-- END GENERATED: Models -->
