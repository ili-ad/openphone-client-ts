// src/request.ts
import type { paths } from './sdk'

const BASE = process.env.OPENPHONE_BASE_URL ?? 'https://api.openphone.com/v1'
const KEY  = process.env.OPENPHONE_API_KEY as string

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

/** Extract the application/json response payload for a given path+method */
type JsonResponse<P extends keyof paths, M extends keyof paths[P]> =
  paths[P][M] extends { responses: infer R }
    ? R extends Record<string, { content: { 'application/json': infer C } }>
      ? C
      : never
    : never

export async function request<
  P extends keyof paths,
  M extends Method & keyof paths[P]
>(
  path: P,
  method: M,
  opts: RequestInit & { body?: unknown } = {}
): Promise<JsonResponse<P, M>> {
  const res = await fetch(`${BASE}${path as string}`, {
    method: method.toUpperCase(),
    headers: {
      'X-API-KEY': KEY,
      'Content-Type': 'application/json',
      ...(opts.headers ?? {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })

  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json() as JsonResponse<P, M>
}
