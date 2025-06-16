import { request } from '../request'
import type { paths } from '../sdk'

export type ListMessagesResponse =
  paths['/v1/messages']['get']['responses']['200']['content']['application/json']

export async function listMessages(
  query: paths['/v1/messages']['get']['parameters']['query']
): Promise<ListMessagesResponse> {
  const params = new URLSearchParams()
  params.set('phoneNumberId', query.phoneNumberId)
  if (query.userId) params.set('userId', query.userId)
  for (const p of query.participants) params.append('participants', p)
  if (query.since) params.set('since', query.since)
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
  return request('/v1/messages', 'post', { body } as any) as unknown as SendMessageResponse
}
