import { request } from '../request'
import type { paths } from '../sdk'

export type GetCallTranscriptWebhooksResponse = unknown

export async function getCallTranscriptWebhooks() {
  return request(
    '/v1/webhooks/call-transcripts' as `/v1/webhooks/call-transcripts`,
    'get'
  ) as unknown as GetCallTranscriptWebhooksResponse
}

export type CreateCallTranscriptWebhookResponse =
  paths['/v1/webhooks/call-transcripts']['post']['responses']['201']['content']['application/json']

export async function createCallTranscriptWebhook(
  body: paths['/v1/webhooks/call-transcripts']['post']['requestBody']['content']['application/json']
) {
  return request(
    '/v1/webhooks/call-transcripts',
    'post',
    { body } as any
  ) as Promise<CreateCallTranscriptWebhookResponse>
}
