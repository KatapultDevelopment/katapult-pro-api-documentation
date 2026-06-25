<!-- Internal authoring guide for the v3 code examples. Safe to keep in the repo;
     it documents the conventions every example file follows. -->
# v3 Example Authoring Conventions

All examples target the production base URL `https://katapultpro.com/api/v3` and
authenticate with `?api_key=<<YOUR_API_KEY>>`. Each example is self-contained
and runnable after the reader substitutes their API key (and any ids).

## File naming

- Node: `ApiExamples/Nodejs/node-{operationId}.js`
- Python: `ApiExamples/Python/py-{operationId}.py`

`{operationId}` is the OpenAPI `operationId` from `../openapi.yaml` (e.g.
`listJobs`, `createNode`, `getPhotoUrl`).

## Required header (all files)

Every file begins with a disclaimer header naming the call, e.g. (Node):

```js
//*********************************************************************************************
//* Name: node-createNode.js
//* Description: Katapult Pro API v3 — Create a node in a job.
//* Disclaimer: Katapult Engineering assumes no responsibility or liability for any errors
//*             or omissions in the content of this Katapult API Example.
//* Setup: npm install axios
//*********************************************************************************************
```

## Conventions

- **Node** uses `axios`. **Python** uses `requests` (`pip install requests`).
- Define `URL_PATH`/`API_KEY` (or equivalents) as constants at the top.
- Path ids (`job_id`, `node_id`, …) are clearly-marked placeholder constants the
  reader fills in.
- Always print the response and handle errors, printing the HTTP status and the
  response body so token `meta` and error `type` are visible.
- Photo uploads send raw `image/jpeg` bytes from a local file (`sample.jpg`) with
  `Content-Type: image/jpeg`.
- Use realistic sample data (e.g. Buffalo, NY coordinates `42.8864, -78.8784`;
  `add_attributes: { node_type: "pole" }`).
- Keep examples focused on one endpoint; cross-endpoint flows live in `../guides/`.
