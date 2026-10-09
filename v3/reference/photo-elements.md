# Photo Elements

Annotated elements placed on a photo.

> **Note:** Photo element updates via the API currently do **not** update
> effective moves in midspans.

Element attributes are stored as a flat map directly on the element — see
[Working with attributes](../concepts/attributes.md#photo-elements-and-traces).

<!-- BEGIN GENERATED: Photo Elements -->
<!-- Do not edit by hand. Generated from ../openapi.yaml by `npm run docs:gen:md`. -->

| Method | Endpoint | Average token cost | Description |
| --- | --- | --- | --- |
| `GET` | [`/jobs/{job_id}/photos/{photo_id}/photo_elements`](#get-all-elements-on-a-photo) | 4 | Get all elements on a photo |
| `POST` | [`/jobs/{job_id}/photos/{photo_id}/photo_elements`](#create-a-photo-element) | 515 | Create a photo element |
| `GET` | [`/jobs/{job_id}/photos/{photo_id}/photo_elements/{element_id}`](#get-a-photo-element) | 7 | Get a photo element |
| `POST` | [`/jobs/{job_id}/photos/{photo_id}/photo_elements/{element_id}`](#update-a-photo-element) | 994 | Update a photo element |
| `DELETE` | [`/jobs/{job_id}/photos/{photo_id}/photo_elements/{element_id}`](#delete-a-photo-element) | 933 | Delete a photo element |

### Get all elements on a photo

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/photo_elements
```

**Average token cost:** 4

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `include_mr_violations` | `true` \| `false` | If `"true"`, each photo element includes an `mr_violations` object with the element's make ready clearance violations. This runs the make ready clearance calculation for the whole photo, so it reads additional job and model data and costs more tokens than the same request without the flag. |

### Create a photo element

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/photo_elements
```

**Average token cost:** 515

A top-level point element (a type the job model defines as a point marker) requires `pixel_selection`; a chip element cannot have `pixel_selection` or `manual_height`. Breaking either rule returns `400 invalid_request`. A `parent_id` that names no element on the photo returns `404 not_found`. See [nesting photo elements](../concepts/complex-parameters.md#nesting-photo-elements-parent_id-and-trace_id).

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |

Body fields:

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `element_type` | string | ✓ | Type of photo element, e.g. `attachment` (an annotation, measurement, or marked point). |
| `pixel_selection` | { percentX, percentY } |  | Position on the photo as fractions of the image: `percentX`/`percentY`, each 0–1. |
| `manual_height` | string |  | Feet-inches notation, e.g. `25-6`. |
| `attributes` | object (flat map) |  | Flat map of attributes stored directly on the element (attribute name to value). See [Working with attributes](../concepts/attributes.md). |
| `parent_id` | string |  | Id of another photo element to nest this element under. See [complex parameters](../concepts/complex-parameters.md). |
| `trace_id` | string |  | Id of the trace to add this element to. See [complex parameters](../concepts/complex-parameters.md). |

### Get a photo element

```sh
GET https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/photo_elements/{element_id}
```

**Average token cost:** 7

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |
| `element_id` | string | Id of the photo element. |

Query parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `include_mr_violations` | `true` \| `false` | If `"true"`, each photo element includes an `mr_violations` object with the element's make ready clearance violations. This runs the make ready clearance calculation for the whole photo, so it reads additional job and model data and costs more tokens than the same request without the flag. |

### Update a photo element

```sh
POST https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/photo_elements/{element_id}
```

**Average token cost:** 994

Updates the element. If no element with the id exists, one is created (unless `onlyIfExists=true`). `element_type` may only be set on create. A `parent_id` that names no element on the photo returns `404 not_found`, and one that names this element or one of its children returns `400 invalid_request`. Moving a point element to the top level (`parent_id: null`) requires `pixel_selection` in the same request. See [nesting photo elements](../concepts/complex-parameters.md#nesting-photo-elements-parent_id-and-trace_id).

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
| `element_type` | string |  | Type of the element. Can only be set at creation; cannot be changed on update. |
| `pixel_selection` | { percentX, percentY } |  | Position on the photo as fractions of the image: `percentX`/`percentY`, each 0–1. |
| `manual_height` | string |  | Feet-inches notation, e.g. `25-6`. |
| `attributes` | object (flat map) |  | Flat map of attributes stored directly on the element (attribute name to value). See [Working with attributes](../concepts/attributes.md). |
| `parent_id` | string \| null |  | Id of another photo element to nest this element under; set to `null` to de-nest. See [complex parameters](../concepts/complex-parameters.md). |
| `trace_id` | string |  | Id of the trace to add this element to. See [complex parameters](../concepts/complex-parameters.md). |

### Delete a photo element

```sh
DELETE https://katapultpro.com/api/v3/jobs/{job_id}/photos/{photo_id}/photo_elements/{element_id}
```

**Average token cost:** 933

Deletes the element and any elements nested under it. Returns `404 not_found` if no element with the id exists on the photo.

Path parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `job_id` | string | Id of the job. |
| `photo_id` | string | Id of the photo. |
| `element_id` | string | Id of the photo element. |

<!-- END GENERATED: Photo Elements -->

## Make ready violations

Add `include_mr_violations=true` to either GET endpoint to include an
`mr_violations` object on each returned element. These are the same violations
shown when you expand an element's move handle info panel in Make Ready View.

```json
"mr_violations": {
  "groups": [
    {
      "element_id": "-OZOsZRC4nOZaKObdcy2",
      "shorthand": "Comms",
      "heading": "Comms must be:",
      "violations": ["12\" below Proposed Fiber", "40\" below Neutral", "40\" below Primary"],
      "exceptions": ["Except when guarded"]
    }
  ]
}
```

The panel covers the element **and its child elements**, so `mr_violations` does
too.

- `groups` — one entry per element that has current (proposed, post move)
  violations: the element itself first, then its children in photo order. Empty
  if nothing is in violation.
  - `heading` and `violations` are the lines the panel renders. A violation line
    reads `<clearance>" <direction> <shorthand>`, meaning the element must be
    that many inches above/below/away from an element with that make ready
    shorthand.
  - `exceptions` — exceptions listed on that element's make ready model (the
    panel shows these in yellow, flagged with `*`). Empty if there are none.

An element with no violations — including one with no matching make ready model —
returns `{ "groups": [] }`.

The flag runs the make ready clearance calculation for the entire photo, which
reads the photo's associated node or section, the job's traces, and the job
model's make ready configuration. Requests that use it cost more tokens than the
same request without it.
