import { request } from '../request'
import { assertValidCreatedRange } from '../validate'
import type { paths } from '../sdk'

export type ListCallsResponse =
  paths['/v1/calls']['get']['responses']['200']['content']['application/json']

export type ListCallsQuery = Omit<
  paths['/v1/calls']['get']['parameters']['query'],
  'since'
> & { since?: never }

export async function listCalls(
  params: ListCallsQuery
) {
  if ((params as any).since !== undefined) {
    throw new Error(
      'since is deprecated and behaves incorrectly; use createdAfter/createdBefore'
    )
  }
  if (!params.phoneNumberId) {
    throw new Error('phoneNumberId is required')
  }
  if (!Array.isArray(params.participants) || params.participants.length < 1) {
    throw new Error('participants must include at least one value')
  }
  if (!Number.isInteger(params.maxResults) || params.maxResults < 1 || params.maxResults > 100) {
    throw new Error('maxResults must be an integer between 1 and 100')
  }
  assertValidCreatedRange(params.createdAfter, params.createdBefore)

  const { since: _since, ...rest } = params as ListCallsQuery & { since?: unknown }

  const qs = new URLSearchParams()
  for (const [key, value] of Object.entries(rest)) {
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
