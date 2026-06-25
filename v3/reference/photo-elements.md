# Photo Elements

Annotated elements placed on a photo.

> **Note:** Photo element updates via the API currently do **not** update
> effective moves in midspans.

Element attributes are stored as a flat map directly on the element — see
[Working with attributes](../concepts/attributes.md#photo-elements-and-traces).

<!-- BEGIN GENERATED: Photo Elements -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/photos/{photo_id}/photo_elements`](#get-all-elements-on-a-photo) | 1 | Get all elements on a photo |
| `POST` | [`/jobs/{job_id}/photos/{photo_id}/photo_elements`](#create-a-photo-element) | 10 | Create a photo element |
| `GET` | [`/jobs/{job_id}/photos/{photo_id}/photo_elements/{element_id}`](#get-a-photo-element) | 1 | Get a photo element |
| `POST` | [`/jobs/{job_id}/photos/{photo_id}/photo_elements/{element_id}`](#update-a-photo-element) | 10 | Update a photo element |
| `DELETE` | [`/jobs/{job_id}/photos/{photo_id}/photo_elements/{element_id}`](#delete-a-photo-element) | 10 | Delete a photo element |

### Get all elements on a photo

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/photo_elements
```

**Token cost:** 1

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |

### Create a photo element

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/photo_elements
```

**Token cost:** 10

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `element_type` | string | ✓ |  |
| `pixel_selection` | { percentX, percentY } |  |  |
| `manual_height` | string |  | Feet-inches notation, e.g. `25-6`. |
| `attributes` | object (flat map) |  |  |
| `parent_id` | string |  |  |
| `trace_id` | string |  |  |

### Get a photo element

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/photo_elements/{element_id}
```

**Token cost:** 1

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |
| `element_id` | string | Id of the photo element. |

### Update a photo element

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/photo_elements/{element_id}
```

**Token cost:** 10

Updates the element. If no element with the id exists, one is created (unless `onlyIfExists=true`). `element_type` may only be set on create.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |
| `element_id` | string | Id of the photo element. |

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `onlyIfExists` | `true` \| `false` | If `"true"`, the resource is only updated if it exists (no creation). |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `element_type` | string |  | Only settable when creating a new element. |
| `pixel_selection` | { percentX, percentY } |  |  |
| `manual_height` | string |  |  |
| `attributes` | object (flat map) |  |  |
| `parent_id` | string \| null |  | Set to null to de-nest. |
| `trace_id` | string |  |  |

### Delete a photo element

```sh
DELETE https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/photo_elements/{element_id}
```

**Token cost:** 10

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |
| `element_id` | string | Id of the photo element. |

<!-- END GENERATED: Photo Elements -->
