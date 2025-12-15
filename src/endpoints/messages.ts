import { request } from '../request'
import { assertValidCreatedRange } from '../validate'
import type { paths } from '../sdk'

export type ListMessagesResponse =
  paths['/v1/messages']['get']['responses']['200']['content']['application/json']

export type ListMessagesQuery = Omit<
  paths['/v1/messages']['get']['parameters']['query'],
  'since'
> & { since?: never }

export async function listMessages(
  query: ListMessagesQuery
): Promise<ListMessagesResponse> {
  if ((query as any).since !== undefined) {
    throw new Error(
      'since is deprecated and behaves incorrectly; use createdAfter/createdBefore'
    )
  }
  if (!query.phoneNumberId) {
    throw new Error('phoneNumberId is required')
  }
  if (!Array.isArray(query.participants) || query.participants.length < 1) {
    throw new Error('participants must include at least one value')
  }
  if (!Number.isInteger(query.maxResults) || query.maxResults < 1 || query.maxResults > 100) {
    throw new Error('maxResults must be an integer between 1 and 100')
  }
  assertValidCreatedRange(query.createdAfter, query.createdBefore)

  const params = new URLSearchParams()
  params.set('phoneNumberId', query.phoneNumberId)
  if (query.userId) params.set('userId', query.userId)
  for (const p of query.participants) params.append('participants', p)
  if (query.createdAfter) params.set('createdAfter', query.createdAfter)
  if (query.createdBefore) params.set('createdBefore', query.createdBefore)
  params.set('maxResults', String(query.maxResults))
  if (query.pageToken) params.set('pageToken', query.pageToken)

  const path = (`/v1/messages?${params.toString()}`) as unknown as '/v1/messages'
  return request(path, 'get') as unknown as ListMessagesResponse
}

export type SendMessageResponse =
  paths['/v1/messages']['post']['responses']['202']['content']['application/json']

export async function sendMessage(
  body: paths['/v1/messages']['post']['requestBody']['content']['application/json']
): Promise<SendMessageResponse> {
  if (!Array.isArray(body.to) || body.to.length !== 1) {
    throw new Error('`to` must contain exactly one recipient')
  }
  const recipient = body.to[0]
  if (typeof recipient !== 'string' || !/^\+\d+$/.test(recipient)) {
    throw new Error('`to` must contain a valid E.164 phone number')
  }

  return request('/v1/messages', 'post', { body } as any) as unknown as SendMessageResponse
}
