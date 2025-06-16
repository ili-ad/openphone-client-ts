import { request } from '../request'
import type { paths } from '../sdk'

export type GetWebhookResponse =
  paths['/v1/webhooks/{id}']['get']['responses']['200']['content']['application/json']

export async function getWebhook(id: string): Promise<GetWebhookResponse> {
  return request(
    `/v1/webhooks/${id}` as `/v1/webhooks/{id}`,
    'get'
  ) as unknown as GetWebhookResponse
}

export type UpdateWebhookResponse = unknown

export async function updateWebhook(
  id: string,
  body: unknown
): Promise<UpdateWebhookResponse> {
  return request(
    `/v1/webhooks/${id}` as unknown as `/v1/webhooks/{id}`,
    'patch',
    { body } as any
  ) as unknown as UpdateWebhookResponse
}

export type DeleteWebhookResponse = unknown

export async function deleteWebhook(id: string): Promise<DeleteWebhookResponse> {
  return request(
    `/v1/webhooks/${id}` as unknown as `/v1/webhooks/{id}`,
    'delete'
  ) as unknown as DeleteWebhookResponse
}
