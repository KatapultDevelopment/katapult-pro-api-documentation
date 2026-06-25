# Building a job

This is an end-to-end walkthrough that builds a small job from scratch with
`curl`: create a job, add two nodes, connect them with a span, add a midpoint
section on that span, then read it all back. Every request is real and every
response is trimmed to the fields that matter.

Throughout, substitute your own `YOUR_API_KEY` and copy the ids returned by each
step into the next.

> **Token costs.** Writes (`POST`/`DELETE`) cost **10 tokens** each; reads
> (`GET`) cost **1**. This walkthrough spends roughly **44 tokens** (4 writes +
> 4 reads) out of the default 10,000-token bucket. Read `meta.token_count` on
> each response to track your balance, and see
> [Rate limits & the token bucket](../rate-limits.md) for pacing guidance.

## 1. Create a job — 10 tokens

`POST /jobs` requires a `name` and a `model`. You can attach flat `metadata` at
creation time.

```sh
curl -X POST "https://katapultpro.com/api/v3/jobs?api_key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Walkthrough Job",
    "model": "katapult-standard",
    "metadata": { "city": "Buffalo" }
  }'
```

```json
{
  "status": "success",
  "data": { "id": "-O_jobAbc123", "name": "API Walkthrough Job" },
  "meta": { "token_count": 9990, "last_refill_time": 1718450000000 }
}
```

Save the job id (`-O_jobAbc123`) — every remaining request is scoped to it.

## 2. Add two nodes — 10 tokens each

`POST /jobs/{job_id}/nodes` requires `latitude` and `longitude`. Use
`add_attributes` to set flat attributes such as the node type. We will create
two poles a short distance apart in Buffalo, NY.

First node:

```sh
curl -X POST "https://katapultpro.com/api/v3/jobs/-O_jobAbc123/nodes?api_key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 42.8864,
    "longitude": -78.8784,
    "add_attributes": { "node_type": "pole" }
  }'
```

```json
{
  "status": "success",
  "data": { "id": "-O_nodeA1", "latitude": 42.8864, "longitude": -78.8784 },
  "meta": { "token_count": 9980, "last_refill_time": 1718450000000 }
}
```

Second node:

```sh
curl -X POST "https://katapultpro.com/api/v3/jobs/-O_jobAbc123/nodes?api_key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 42.8870,
    "longitude": -78.8770,
    "add_attributes": { "node_type": "pole" }
  }'
```

```json
{
  "status": "success",
  "data": { "id": "-O_nodeB2", "latitude": 42.8870, "longitude": -78.8770 },
  "meta": { "token_count": 9970, "last_refill_time": 1718450000000 }
}
```

Note the two node ids: `-O_nodeA1` and `-O_nodeB2`.

## 3. Connect the nodes — 10 tokens

A connection (span) joins two nodes. `POST /jobs/{job_id}/connections` requires
`node_id_1` and `node_id_2`.

```sh
curl -X POST "https://katapultpro.com/api/v3/jobs/-O_jobAbc123/connections?api_key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "node_id_1": "-O_nodeA1",
    "node_id_2": "-O_nodeB2",
    "add_attributes": { "connection_type": "aerial cable" }
  }'
```

```json
{
  "status": "success",
  "data": {
    "id": "-O_connXY",
    "node_id_1": "-O_nodeA1",
    "node_id_2": "-O_nodeB2"
  },
  "meta": { "token_count": 9960, "last_refill_time": 1718450000000 }
}
```

The connection id is `-O_connXY`.

## 4. Add a midpoint section — 10 tokens

Sections are midspan points on a connection. Pass `make_midpoint: true` to place
one at the connection's midpoint without supplying coordinates yourself.

> **Caveat.** `make_midpoint: true` **overwrites an existing midpoint section
> and deletes its data.** Use it only when you intend to (re)create the
> midpoint.

```sh
curl -X POST "https://katapultpro.com/api/v3/jobs/-O_jobAbc123/connections/-O_connXY/sections?api_key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "make_midpoint": true,
    "add_attributes": { "note": "midspan measurement point" }
  }'
```

```json
{
  "status": "success",
  "data": { "id": "-O_sectionM", "latitude": 42.8867, "longitude": -78.8777 },
  "meta": { "token_count": 9950, "last_refill_time": 1718450000000 }
}
```

The section id is `-O_sectionM`, placed at the computed midpoint.

## 5. Read it all back — 1 token each

### List the nodes

```sh
curl "https://katapultpro.com/api/v3/jobs/-O_jobAbc123/nodes?api_key=YOUR_API_KEY"
```

```json
{
  "status": "success",
  "data": [
    { "id": "-O_nodeA1", "latitude": 42.8864, "longitude": -78.8784 },
    { "id": "-O_nodeB2", "latitude": 42.8870, "longitude": -78.8770 }
  ],
  "meta": { "token_count": 9949, "last_refill_time": 1718450000000 }
}
```

### Get the connection (includes its sections)

Fetching a connection returns its `sections` map, so you can confirm the
midpoint in the same call.

```sh
curl "https://katapultpro.com/api/v3/jobs/-O_jobAbc123/connections/-O_connXY?api_key=YOUR_API_KEY"
```

```json
{
  "status": "success",
  "data": {
    "id": "-O_connXY",
    "node_id_1": "-O_nodeA1",
    "node_id_2": "-O_nodeB2",
    "sections": {
      "-O_sectionM": { "latitude": 42.8867, "longitude": -78.8777 }
    }
  },
  "meta": { "token_count": 9948, "last_refill_time": 1718450000000 }
}
```

### List the sections on the connection

```sh
curl "https://katapultpro.com/api/v3/jobs/-O_jobAbc123/connections/-O_connXY/sections?api_key=YOUR_API_KEY"
```

```json
{
  "status": "success",
  "data": [
    { "id": "-O_sectionM", "latitude": 42.8867, "longitude": -78.8777 }
  ],
  "meta": { "token_count": 9947, "last_refill_time": 1718450000000 }
}
```

## What you built

A job containing two pole nodes, an aerial span between them, and a midpoint
section on that span — all created and verified through the API.

## Where to go next

- [Working with photos](working-with-photos.md) — attach photos to these nodes
  and sections, annotate them, and calibrate them.
- [Jobs reference](../reference/jobs.md), plus
  [Nodes](../reference/nodes.md), [Connections](../reference/connections.md),
  and [Sections](../reference/sections.md) for the full endpoint contracts.
- [Rate limits & the token bucket](../rate-limits.md) — pace bulk writes so a
  large build stays within the per-minute budget.
