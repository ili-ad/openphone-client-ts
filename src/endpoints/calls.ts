import { request } from '../request'
import type { paths } from '../sdk'

export type ListCallsResponse =
  paths['/v1/calls']['get']['responses']['200']['content']['application/json']

export async function listCalls(
  params: paths['/v1/calls']['get']['parameters']['query']
) {
  const qs = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue
    if (Array.isArray(value)) {
      for (const v of value) qs.append(key, String(v))
    } else {
      qs.append(key, String(value))
    }
  }
  const url = `/v1/calls?${qs}`
  return request(url as unknown as '/v1/calls', 'get')
}

export type CreateCallResponse = unknown

export async function createCall(body: unknown): Promise<CreateCallResponse> {
  return request('/v1/calls', 'post', { body } as any) as unknown as CreateCallResponse
}
