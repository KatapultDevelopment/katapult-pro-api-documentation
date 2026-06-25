# Calibration Anchors

Photo calibration anchor points.

> **Note:** Adding or modifying anchor calibration points via the API always
> un-calibrates the photo (removes `stick_align`). Viewing the photo in Katapult
> Pro recalibrates it based on the updated anchor points.

<!-- BEGIN GENERATED: Calibration Anchors -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/photos/{photo_id}/calibration_anchors`](#get-all-calibration-anchors-on-a-photo) | 1 | Get all calibration anchors on a photo |
| `POST` | [`/jobs/{job_id}/photos/{photo_id}/calibration_anchors`](#create-a-calibration-anchor) | 10 | Create a calibration anchor |
| `GET` | [`/jobs/{job_id}/photos/{photo_id}/calibration_anchors/{anchor_id}`](#get-a-calibration-anchor) | 1 | Get a calibration anchor |
| `POST` | [`/jobs/{job_id}/photos/{photo_id}/calibration_anchors/{anchor_id}`](#update-a-calibration-anchor) | 10 | Update a calibration anchor |
| `DELETE` | [`/jobs/{job_id}/photos/{photo_id}/calibration_anchors/{anchor_id}`](#delete-a-calibration-anchor) | 10 | Delete a calibration anchor |

### Get all calibration anchors on a photo

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/calibration_anchors
```

**Token cost:** 1

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |

### Create a calibration anchor

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/calibration_anchors
```

**Token cost:** 10

Adding or modifying anchor calibration points always un-calibrates the photo (removes `stick_align`). Viewing the photo in Katapult Pro recalibrates it from the updated points.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `pixel_selection` | { percentX, percentY } | ✓ |  |
| `height` | number | ✓ | Height in decimal feet. |

### Get a calibration anchor

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/calibration_anchors/{anchor_id}
```

**Token cost:** 1

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |
| `anchor_id` | string | Id of the calibration anchor. |

### Update a calibration anchor

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/calibration_anchors/{anchor_id}
```

**Token cost:** 10

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |
| `anchor_id` | string | Id of the calibration anchor. |

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `onlyIfExists` | `true` \| `false` | If `"true"`, the resource is only updated if it exists (no creation). |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `pixel_selection` | { percentX, percentY } |  |  |
| `height` | number |  |  |

### Delete a calibration anchor

```sh
DELETE https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/calibration_anchors/{anchor_id}
```

**Token cost:** 10

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |
| `anchor_id` | string | Id of the calibration anchor. |

<!-- END GENERATED: Calibration Anchors -->
