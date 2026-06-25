# Working with photos

This guide covers the photo workflow with `curl`: upload a photo to a node, get
a signed download URL, annotate the photo with a photo element and a calibration
anchor, and associate or unassociate a photo with an item. It assumes you
already have a job with a node and a section — see
[Building a job](building-a-job.md) if not.

Substitute your own `YOUR_API_KEY` and ids throughout. The ids below
(`-O_jobAbc123`, `-O_nodeA1`, `-O_connXY`, `-O_sectionM`) carry over from the
[Building a job](building-a-job.md) walkthrough.

> **Token costs.** Photo uploads and other writes (`POST`/`DELETE`) cost **10
> tokens**; reads (`GET`), including the signed-URL endpoint, cost **1**. Read
> `meta.token_count` on each response and see
> [Rate limits & the token bucket](../rate-limits.md) for pacing.

## 1. Upload a photo to a node — 10 tokens

`POST /jobs/{job_id}/nodes/{node_id}/photos` uploads the **raw JPEG bytes** with
`Content-Type: image/jpeg` and associates the photo to the node in one call. The
optional `association_value` query parameter controls how it is associated:
`true` (default) or `main` to make it the node's main photo.

```sh
curl -X POST "https://katapultpro.com/api/v3/jobs/-O_jobAbc123/nodes/-O_nodeA1/photos?api_key=YOUR_API_KEY&association_value=main" \
  -H "Content-Type: image/jpeg" \
  --data-binary "@sample.jpg"
```

```json
{
  "status": "success",
  "data": { "id": "-O_photo01" },
  "meta": { "token_count": 9990, "last_refill_time": 1718450000000 }
}
```

The upload returns the new photo id (`-O_photo01`). The response is just the id —
the image bytes are stored separately and retrieved via the URL endpoint below.

## 2. Get a download URL (7-day signed) — 1 token

`GET /jobs/{job_id}/photos/{photo_id}/url` returns a signed URL for downloading
the image. **The URL expires 7 days after it is generated**, so fetch it when
you need it rather than storing it long-term. Optional `file_size` (default
`full`) and `file_type` (default `webp`) query parameters pick the variant.

```sh
curl "https://katapultpro.com/api/v3/jobs/-O_jobAbc123/photos/-O_photo01/url?api_key=YOUR_API_KEY"
```

```json
{
  "status": "success",
  "data": {
    "url": "https://storage.googleapis.com/katapultpro-photos/...&Expires=1719054800&Signature=..."
  },
  "meta": { "token_count": 9989, "last_refill_time": 1718450000000 }
}
```

## 3. Add a photo element — 10 tokens

Photo elements are annotations placed on a photo (an attachment, a measurement,
a marked point, …). `POST /jobs/{job_id}/photos/{photo_id}/photo_elements`
requires an `element_type`; `pixel_selection` positions it as fractions of the
image (`percentX`/`percentY`, 0–1), and `manual_height` accepts feet-inches
notation such as `25-6`.

```sh
curl -X POST "https://katapultpro.com/api/v3/jobs/-O_jobAbc123/photos/-O_photo01/photo_elements?api_key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "element_type": "attachment",
    "pixel_selection": { "percentX": 0.5, "percentY": 0.42 },
    "manual_height": "25-6"
  }'
```

```json
{
  "status": "success",
  "data": { "id": "-O_elem01" },
  "meta": { "token_count": 9979, "last_refill_time": 1718450000000 }
}
```

> `element_type` can only be set when the element is created. Later updates via
> `POST .../photo_elements/{element_id}` cannot change it.

## 4. Add a calibration anchor — 10 tokens

Calibration anchors are reference points (a pixel location plus a known height)
that let Katapult Pro scale measurements on a photo. `POST
/jobs/{job_id}/photos/{photo_id}/calibration_anchors` requires `pixel_selection`
and a `height` in **decimal feet**.

```sh
curl -X POST "https://katapultpro.com/api/v3/jobs/-O_jobAbc123/photos/-O_photo01/calibration_anchors?api_key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "pixel_selection": { "percentX": 0.5, "percentY": 0.95 },
    "height": 0
  }'
```

```json
{
  "status": "success",
  "data": { "id": "-O_anchor01" },
  "meta": { "token_count": 9969, "last_refill_time": 1718450000000 }
}
```

> **Un-calibration caveat.** Adding or modifying anchor calibration points
> **always un-calibrates the photo** (it removes `stick_align`). The photo is
> recalibrated from the updated points the next time it is **viewed in Katapult
> Pro** — calibration does not recompute over the API. Plan for photos to read
> as uncalibrated between an anchor write and the next in-app view.

## 5. Associate and unassociate a photo — 10 tokens each

A photo can be uploaded to the job on its own (`POST /jobs/{job_id}/photos`) and
later attached to an item, or moved between items, with `POST
/jobs/{job_id}/photos/{photo_id}/associate`.

- For a **node**, send `node_id`.
- For a **section**, send both `connection_id` and `section_id`.
- `association_value` is `true`, `main`, or `null` (to **unassociate**).

Associate the photo to a section as its main photo:

```sh
curl -X POST "https://katapultpro.com/api/v3/jobs/-O_jobAbc123/photos/-O_photo01/associate?api_key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "connection_id": "-O_connXY",
    "section_id": "-O_sectionM",
    "association_value": "main"
  }'
```

```json
{
  "status": "success",
  "data": {},
  "meta": { "token_count": 9959, "last_refill_time": 1718450000000 }
}
```

Unassociate it by sending the same target with `association_value: null`:

```sh
curl -X POST "https://katapultpro.com/api/v3/jobs/-O_jobAbc123/photos/-O_photo01/associate?api_key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "connection_id": "-O_connXY",
    "section_id": "-O_sectionM",
    "association_value": null
  }'
```

```json
{
  "status": "success",
  "data": {},
  "meta": { "token_count": 9949, "last_refill_time": 1718450000000 }
}
```

> **Midspan effective-moves caveat.** When a photo is associated to a **section**
> (a midspan point), heights on its elements are interpreted relative to that
> midspan location. Moving the photo's association — to a different section or to
> a node — changes the effective frame those measurements resolve against, so a
> height that read one way at the midspan can resolve differently after the move.
> Re-check element heights and calibration after re-associating a midspan photo.

## Where to go next

- [Photos reference](../reference/photos.md),
  [Photo Elements](../reference/photo-elements.md), and
  [Calibration Anchors](../reference/calibration-anchors.md) for the full
  endpoint contracts.
- [Building a job](building-a-job.md) — create the job, nodes, connection, and
  section these photos attach to.
- [Rate limits & the token bucket](../rate-limits.md) — uploads cost 10 tokens
  each; pace bulk photo imports accordingly.
