import { request } from '../request'
import type { paths } from '../sdk'

export type ListCallWebhooksResponse = unknown

export async function listCallWebhooks() {
  return request('/v1/webhooks/calls', 'get')
}

export type CreateCallWebhookBody =
  paths['/v1/webhooks/calls']['post']['requestBody']['content']['application/json']

export type CreateCallWebhookResponse =
  paths['/v1/webhooks/calls']['post']['responses']['201']['content']['application/json']

export async function createCallWebhook(body: CreateCallWebhookBody) {
  return request('/v1/webhooks/calls', 'post', { body } as any)
}
