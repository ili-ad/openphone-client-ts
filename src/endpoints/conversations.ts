import { request } from '../request'
import type { paths } from '../sdk'

export type ListConversationsResponse =
  paths['/v1/conversations']['get']['responses']['200']['content']['application/json']

export async function listConversations() {
  return request('/v1/conversations', 'get')
}

export type CreateConversationResponse = unknown

export async function createConversation(body: unknown): Promise<CreateConversationResponse> {
  return request('/v1/conversations', 'post', { body } as any) as unknown as CreateConversationResponse
}
