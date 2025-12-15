import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const httpMethods = new Set([
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace',
]);

export function generateEndpointsMarkdown(specFilePath) {
  const specContent = readFileSync(specFilePath, 'utf8');
  const spec = JSON.parse(specContent);

  const rows = [];

  for (const [specPathKey, operations] of Object.entries(spec.paths ?? {})) {
    for (const [method, operation] of Object.entries(operations ?? {})) {
      if (!httpMethods.has(method.toLowerCase())) {
        continue;
      }

      const tags = Array.isArray(operation.tags) ? operation.tags.join(', ') : '';

      rows.push({
        path: specPathKey,
        method: method.toUpperCase(),
        operationId: operation.operationId ?? '',
        tags,
      });
    }
  }

  rows.sort((a, b) => {
    const pathComparison = a.path.localeCompare(b.path);
    if (pathComparison !== 0) {
      return pathComparison;
    }

    return a.method.localeCompare(b.method);
  });

  const tableLines = [
    '| Method | Path | OperationId | Tags |',
    '| --- | --- | --- | --- |',
    ...rows.map((row) => `| ${row.method} | ${row.path} | ${row.operationId} | ${row.tags} |`),
  ];

  return `${tableLines.join('\n')}\n`;
}

function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const specPath = path.resolve(__dirname, '..', 'spec', 'quo-openapi-v1.json');
  const outputPath = path.resolve(__dirname, '..', 'spec', 'endpoints.md');

  const table = generateEndpointsMarkdown(specPath);

  console.log(table);
  writeFileSync(outputPath, table, 'utf8');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
