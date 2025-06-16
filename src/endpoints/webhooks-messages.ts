import { request } from '../request'
import type { paths } from '../sdk'

export type CreateMessageWebhookBody =
  paths['/v1/webhooks/messages']['post']['requestBody']['content']['application/json']

export type CreateMessageWebhookResponse =
  paths['/v1/webhooks/messages']['post']['responses']['201']['content']['application/json']

export type GetMessageWebhooksResponse = unknown

export async function getMessageWebhooks(): Promise<GetMessageWebhooksResponse> {
  return request('/v1/webhooks/messages' as any, 'get') as any
}

export async function createMessageWebhook(
  body: CreateMessageWebhookBody
): Promise<CreateMessageWebhookResponse> {
  return request('/v1/webhooks/messages', 'post', { body } as any) as unknown as CreateMessageWebhookResponse
}
