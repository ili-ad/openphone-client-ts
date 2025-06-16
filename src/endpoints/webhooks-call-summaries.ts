import { request } from '../request'
import type { paths } from '../sdk'

export type ListCallSummaryWebhooksResponse = unknown

export async function listCallSummaryWebhooks(): Promise<ListCallSummaryWebhooksResponse> {
  return request('/v1/webhooks/call-summaries' as any, 'get') as unknown as ListCallSummaryWebhooksResponse
}

export type CreateCallSummaryWebhookResponse =
  paths['/v1/webhooks/call-summaries']['post']['responses']['201']['content']['application/json']

export async function createCallSummaryWebhook(
  body: paths['/v1/webhooks/call-summaries']['post']['requestBody']['content']['application/json']
): Promise<CreateCallSummaryWebhookResponse> {
  return request(
    '/v1/webhooks/call-summaries',
    'post',
    { body } as any
  ) as unknown as CreateCallSummaryWebhookResponse
}
