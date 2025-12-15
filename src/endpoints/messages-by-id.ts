import { request } from '../request'
import type { paths } from '../sdk'

export type GetMessageResponse =
  paths['/v1/messages/{id}']['get']['responses']['200']['content']['application/json']

export async function getMessage(id: string) {
  return request(`/v1/messages/${id}` as `/v1/messages/{id}`, 'get')
}

export type UpdateMessageResponse = unknown

export async function updateMessage(id: string, body: unknown): Promise<UpdateMessageResponse> {
  return request(
    `/v1/messages/${id}` as unknown as `/v1/messages/{id}`,
    'patch',
    { body } as any
  ) as unknown as UpdateMessageResponse
}

export type DeleteMessageResponse = unknown

export async function deleteMessage(id: string): Promise<DeleteMessageResponse> {
  return request(
    `/v1/messages/${id}` as unknown as `/v1/messages/{id}`,
    'delete'
  ) as unknown as DeleteMessageResponse
}
