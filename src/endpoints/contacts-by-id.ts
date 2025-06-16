import { request } from '../request'
import type { paths } from '../sdk'

export type GetContactResponse =
  paths['/v1/contacts/{id}']['get']['responses']['200']['content']['application/json']

export async function getContact(id: string) {
  return request(`/v1/contacts/${id}` as `/v1/contacts/{id}`, 'get')
}

export type UpdateContactResponse =
  paths['/v1/contacts/{id}']['patch']['responses']['200']['content']['application/json']

export async function updateContact(
  id: string,
  body: paths['/v1/contacts/{id}']['patch']['requestBody']['content']['application/json']
): Promise<UpdateContactResponse> {
  return request(
    `/v1/contacts/${id}` as unknown as `/v1/contacts/{id}`,
    'patch',
    { body } as any
  ) as unknown as UpdateContactResponse
}

export type DeleteContactResponse = unknown

export async function deleteContact(id: string): Promise<DeleteContactResponse> {
  return request(
    `/v1/contacts/${id}` as `/v1/contacts/{id}`,
    'delete'
  ) as unknown as DeleteContactResponse
}
