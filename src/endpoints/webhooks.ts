import { request } from '../request'
import type { paths } from '../sdk'

export type ListWebhooksResponse =
  paths['/v1/webhooks']['get']['responses']['200']['content']['application/json']

export async function listWebhooks() {
  return request('/v1/webhooks', 'get') as Promise<ListWebhooksResponse>
}

export type CreateWebhookResponse = unknown

export async function createWebhook(body: unknown): Promise<CreateWebhookResponse> {
  return request(
    '/v1/webhooks' as unknown as '/v1/webhooks',
    'post' as any,
    { body } as any
  ) as unknown as CreateWebhookResponse
}

