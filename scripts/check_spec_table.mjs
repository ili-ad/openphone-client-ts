import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateEndpointsMarkdown } from './spec_table.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const specPath = path.resolve(__dirname, '..', 'spec', 'quo-openapi-v1.json');
const endpointsPath = path.resolve(__dirname, '..', 'spec', 'endpoints.md');

const generated = generateEndpointsMarkdown(specPath).replace(/\r\n/g, '\n');
const existing = readFileSync(endpointsPath, 'utf8').replace(/\r\n/g, '\n');

if (generated !== existing) {
  console.error('spec/endpoints.md is out of date. Run: npm run spec:table and commit the result.');
  process.exit(1);
}
