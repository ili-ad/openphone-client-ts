# Agent Work Instructions
Find the "wrapper backlog" in todo.md indicated in your prompt and:
1. Add wrapper(s) in src/endpoints/
2. Export from src/index.ts
3. Add Vitest test under tests/
4. Mark the task complete ([x])

## Coding conventions
* Import the shared helper **`request` from `../request`** – do not call `fetch` directly.
* Place *all* functions for the same path in one file (`src/endpoints/<name>.ts`).
* Re-export new functions from `src/index.ts`.
* Type responses with the shapes in `sdk.ts`; if the spec shows no JSON body, return `void`.
* Filenames: collection → `calls.ts`; single-item (has `{id}`) → `calls-by-id.ts`.

## Testing
* Use **msw** to mock `fetch`.
* Assertions: URL, HTTP method, `Authorization` header, and JSON body⇄type correctness.
* The test file must live in `tests/` and run clean with `pnpm test`.

## CI expectation
A PR is merge-ready only if `pnpm build && pnpm test` exit with code 0.

