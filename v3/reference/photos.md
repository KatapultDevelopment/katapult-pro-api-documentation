# Photos

Photo records, uploads, signed URLs, and associations.

The photo `GET` endpoints return photo **records** (metadata), not image bytes.
To download the image, call [`GET /jobs/{job_id}/photos/{photo_id}/url`](#get-a-photo-download-url)
for a signed URL (valid for 7 days). Uploads must be `image/jpeg`.

The `associate` endpoint has codependent body fields (target a node **or** a
section; accepted `association_value`s) — see
[Complex & codependent parameters](../concepts/complex-parameters.md#associating-a-photo-node-vs-section-vs-unassociate).

<!-- BEGIN GENERATED: Photos -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/photos`](#get-all-photos) | 1 | Get all photos |
| `POST` | [`/jobs/{job_id}/photos`](#upload-a-photo) | 10 | Upload a photo |
| `GET` | [`/jobs/{job_id}/photos/{photo_id}`](#get-a-photo) | 1 | Get a photo |
| `GET` | [`/jobs/{job_id}/photos/{photo_id}/url`](#get-a-photo-download-url) | 1 | Get a photo download URL |
| `POST` | [`/jobs/{job_id}/photos/{photo_id}/associate`](#associate-a-photo-to-an-item) | 10 | Associate a photo to an item |

### Get all photos

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/photos
```

**Token cost:** 1

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |

### Upload a photo

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/photos
```

**Token cost:** 10

Uploads a JPEG to the job (without associating it to an item).

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |

Request body: raw `image/jpeg` bytes.

### Get a photo

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}
```

**Token cost:** 1

Gets the photo record (metadata, not the image bytes — use the `/url` endpoint for a download link).

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |

### Get a photo download URL

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/url
```

**Token cost:** 1

Returns a signed URL for downloading the photo image. The URL expires 7 days after it is generated.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `file_size` | string | Image size variant. Defaults to `full`. |
| `file_type` | string | Image file type. Defaults to `webp`. |

### Associate a photo to an item

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/associate
```

**Token cost:** 10

Associates the photo to (or unassociates it from) a node or a section. Provide `node_id` for a node, or both `connection_id` and `section_id` for a section. Set `association_value` to `null` to unassociate.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `node_id` | string |  | Id of the node (omit `connection_id`/`section_id`). |
| `connection_id` | string |  | Connection the section is on (with `section_id`). |
| `section_id` | string |  | Id of the section (with `connection_id`). |
| `association_value` | `main` \| `true` \| null | ✓ | `'main'`, `true`, or `null` (to unassociate). Note: `false` is not accepted. |

<!-- END GENERATED: Photos -->
