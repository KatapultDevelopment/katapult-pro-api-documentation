#!/usr/bin/env node
/**
 * Generates the human-readable endpoint reference tables for the v3 docs from
 * v3/openapi.yaml, and injects them into the per-resource pages in
 * v3/reference/. The generated block on each page lives between:
 *
 *   <!-- BEGIN GENERATED: <Tag> -->
 *   <!-- END GENERATED: <Tag> -->
 *
 * Prose outside those markers is preserved. If a reference page does not exist
 * yet, it is created with a default heading + the marker block.
 *
 * Run via `npm run docs:gen:md`.
 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.resolve(__dirname, '..');
const SPEC_PATH = path.join(ROOT, 'v3', 'openapi.yaml');
const REFERENCE_DIR = path.join(ROOT, 'v3', 'reference');
const BASE_URL = 'https://katapultpro.com/api/v3';

const spec = yaml.load(fs.readFileSync(SPEC_PATH, 'utf8'));

/** Resolve a local $ref ("#/components/...") to its node. */
function resolveRef(ref) {
  const parts = ref.replace(/^#\//, '').split('/');
  let node = spec;
  for (const p of parts) node = node?.[p];
  return node;
}

/** Follow a single $ref one level (returns the node, else the input). */
function deref(schema) {
  let s = schema;
  while (s && s.$ref) s = resolveRef(s.$ref);
  return s;
}

/**
 * Flatten an object schema (following $ref and merging allOf) into
 * { properties, required }.
 */
function flattenObject(schema) {
  let s = deref(schema);
  if (!s) return { properties: {}, required: [] };
  let properties = { ...(s.properties || {}) };
  let required = [...(s.required || [])];
  if (Array.isArray(s.allOf)) {
    for (const sub of s.allOf) {
      const flat = flattenObject(sub);
      properties = { ...properties, ...flat.properties };
      required = [...required, ...flat.required];
    }
  }
  return { properties, required: [...new Set(required)] };
}

/** Produce a short, human-readable type label for a schema node. */
function typeLabel(schemaIn) {
  const schema = schemaIn || {};
  if (schema.$ref) {
    const name = schema.$ref.split('/').pop();
    const friendly = {
      EntityAttributeList: 'object (entity attribute list)',
      FlatAttributeMap: 'object (flat map)',
      PixelSelection: '{ percentX, percentY }',
      Breakpoints: 'array of [lat, lon]'
    };
    return friendly[name] || 'object';
  }
  if (schema.enum) return schema.enum.map((e) => `\`${e}\``).join(' \\| ');
  if (schema.oneOf) return schema.oneOf.map((s) => typeLabel(s)).join(' \\| ');
  let t = schema.type;
  if (Array.isArray(t)) t = t.join(' \\| ');
  if (t === 'array') return `array<${typeLabel(schema.items)}>`;
  return t || 'any';
}

function esc(s) {
  return String(s ?? '').replace(/\n+/g, ' ').replace(/\|/g, '\\|').trim();
}

/** Collect path-level + operation-level parameters, resolved, split by location. */
function collectParams(pathItem, op) {
  const all = [...(pathItem.parameters || []), ...(op.parameters || [])].map(deref);
  return {
    path: all.filter((p) => p.in === 'path'),
    query: all.filter((p) => p.in === 'query')
  };
}

/** Get the request body: returns { kind: 'json'|'jpeg'|null, schema }. */
function getRequestBody(op) {
  const content = op.requestBody?.content;
  if (!content) return { kind: null };
  if (content['application/json']) return { kind: 'json', schema: content['application/json'].schema };
  if (content['image/jpeg']) return { kind: 'jpeg' };
  return { kind: null };
}

const METHODS = ['get', 'post', 'put', 'patch', 'delete'];

/** Collect all operations tagged with tagName, in spec-path order. */
function collectOps(tagName) {
  const ops = [];
  for (const [p, pathItem] of Object.entries(spec.paths)) {
    for (const method of METHODS) {
      const op = pathItem[method];
      if (!op || !(op.tags || []).includes(tagName)) continue;
      ops.push({ p, method, pathItem, op });
    }
  }
  return ops;
}

/**
 * Build one summary-table row for an operation. `hrefBase` prefixes the anchor:
 * '' -> "#anchor" (same-page, used on reference pages); 'reference/jobs.md' ->
 * "reference/jobs.md#anchor" (cross-page, used in the README index).
 */
function summaryRow(p, method, op, hrefBase = '') {
  const cost = op['x-token-cost'];
  const restricted = op['x-restricted'] ? ' 🔒' : '';
  const href = `${hrefBase}#${anchor(op.summary)}`;
  return `| \`${method.toUpperCase()}\` | [\`${p}\`](${href})${restricted} | ${esc(cost)} | ${esc(op.summary)} |`;
}

/** Build the generated markdown block for one tag. */
function buildTagMarkdown(tagName) {
  const ops = collectOps(tagName);
  if (ops.length === 0) return '';

  const lines = [];

  // Summary table
  lines.push('| Method | Endpoint | Token cost | Description |');
  lines.push('| --- | --- | --- | --- |');
  for (const { p, method, op } of ops) {
    lines.push(summaryRow(p, method, op));
  }
  lines.push('');

  // Per-operation detail
  for (const { p, method, pathItem, op } of ops) {
    // Heading is the bare summary so its anchor stays stable; the restricted
    // marker goes on its own line below (it would otherwise change the anchor).
    lines.push(`### ${op.summary}`);
    lines.push('');
    if (op['x-restricted']) {
      lines.push('> 🔒 **Restricted** — requires extended API access (disabled in production). See [restricted.md](restricted.md).');
      lines.push('');
    }
    lines.push('```sh');
    lines.push(`${method.toUpperCase()} ${BASE_URL}${p}`);
    lines.push('```');
    lines.push('');
    lines.push(`**Token cost:** ${esc(op['x-token-cost'])}`);
    lines.push('');
    if (op.description) {
      lines.push(esc(op.description));
      lines.push('');
    }

    const { path: pathParams, query: queryParams } = collectParams(pathItem, op);
    if (pathParams.length) {
      lines.push('Path parameters:');
      lines.push('');
      lines.push('| Parameter | Type | Description |');
      lines.push('| --- | --- | --- |');
      for (const prm of pathParams) lines.push(`| \`${prm.name}\` | ${typeLabel(prm.schema)} | ${esc(prm.description)} |`);
      lines.push('');
    }
    if (queryParams.length) {
      lines.push('Query parameters:');
      lines.push('');
      lines.push('| Parameter | Type | Description |');
      lines.push('| --- | --- | --- |');
      for (const prm of queryParams) lines.push(`| \`${prm.name}\` | ${typeLabel(prm.schema)} | ${esc(prm.description)} |`);
      lines.push('');
    }

    const body = getRequestBody(op);
    if (body.kind === 'jpeg') {
      lines.push('Request body: raw `image/jpeg` bytes.');
      lines.push('');
    } else if (body.kind === 'json') {
      const { properties, required } = flattenObject(body.schema);
      const entries = Object.entries(properties);
      if (entries.length) {
        lines.push('Body fields:');
        lines.push('');
        lines.push('| Field | Type | Required | Description |');
        lines.push('| --- | --- | :---: | --- |');
        for (const [name, sch] of entries) {
          const req = required.includes(name) ? '✓' : '';
          lines.push(`| \`${name}\` | ${typeLabel(sch)} | ${req} | ${esc(sch.description)} |`);
        }
        lines.push('');
      } else {
        const ds = deref(body.schema);
        if (ds?.additionalProperties) {
          lines.push('Request body: free-form JSON object (see endpoint description).');
          lines.push('');
        }
      }
    }
  }

  return lines.join('\n').trimEnd();
}

/**
 * Build the consolidated endpoint index for the README: every tagged operation,
 * grouped by resource in SLUGS order, under an H3 that links to the resource's
 * reference page. Endpoint links point cross-page into reference/{slug}.md so the
 * index works from the README's location. The `Root` welcome op (not in SLUGS) is
 * intentionally excluded; it lives in the README's Quick start section.
 */
function buildEndpointIndex() {
  const lines = [];
  for (const [tagName, slug] of Object.entries(SLUGS)) {
    const ops = collectOps(tagName);
    if (ops.length === 0) continue;
    lines.push(`### [${tagName}](reference/${slug}.md)`);
    lines.push('');
    lines.push('| Method | Endpoint | Token cost | Description |');
    lines.push('| --- | --- | --- | --- |');
    for (const { p, method, op } of ops) {
      lines.push(summaryRow(p, method, op, `reference/${slug}.md`));
    }
    lines.push('');
  }
  return lines.join('\n').trimEnd();
}

function anchor(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/🔒|\(restricted\)/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const SLUGS = {
  Jobs: 'jobs',
  Nodes: 'nodes',
  Connections: 'connections',
  Sections: 'sections',
  Photos: 'photos',
  'Photo Elements': 'photo-elements',
  'Calibration Anchors': 'calibration-anchors',
  Traces: 'traces',
  Models: 'models',
  Users: 'users',
  Companies: 'companies'
};

function injectIntoFile(file, tagName, generated, appendIfMissing = true) {
  const begin = `<!-- BEGIN GENERATED: ${tagName} -->`;
  const end = `<!-- END GENERATED: ${tagName} -->`;
  // Path to the spec relative to this file's directory, with forward slashes on
  // any OS: '../openapi.yaml' for reference pages, 'openapi.yaml' for the README.
  const specRel = path.relative(path.dirname(file), SPEC_PATH).split(path.sep).join('/');
  const block = `${begin}\n<!-- Do not edit by hand. Generated from ${specRel} by \`npm run docs:gen:md\`. -->\n\n${generated}\n\n${end}`;

  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const re = new RegExp(`${escapeRe(begin)}[\\s\\S]*?${escapeRe(end)}`);
    if (re.test(content)) {
      content = content.replace(re, block);
    } else if (appendIfMissing) {
      content = `${content.trimEnd()}\n\n${block}\n`;
    } else {
      throw new Error(
        `Markers for "${tagName}" not found in ${file}. Pre-place the ` +
        `"${begin}" / "${end}" marker pair once, then re-run.`
      );
    }
    fs.writeFileSync(file, content);
    return 'updated';
  }

  const tagMeta = (spec.tags || []).find((t) => t.name === tagName);
  const header = `# ${tagName}\n\n${tagMeta?.description || ''}\n\n`;
  fs.writeFileSync(file, `${header}${block}\n`);
  return 'created';
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

fs.mkdirSync(REFERENCE_DIR, { recursive: true });
let created = 0;
let updated = 0;
for (const [tagName, slug] of Object.entries(SLUGS)) {
  const md = buildTagMarkdown(tagName);
  if (!md) continue;
  const file = path.join(REFERENCE_DIR, `${slug}.md`);
  const result = injectIntoFile(file, tagName, md);
  if (result === 'created') created++;
  else updated++;
  console.log(`  ${result}: reference/${slug}.md`);
}

// Consolidated endpoint index on the landing README. Markers must already exist
// (appendIfMissing=false), so a missing pair throws instead of dumping the block
// at end of file.
const readmeFile = path.join(ROOT, 'v3', 'README.md');
injectIntoFile(readmeFile, 'Endpoint Index', buildEndpointIndex(), false);
updated++;
console.log('  updated: README.md');

console.log(`Done. ${created} created, ${updated} updated.`);
