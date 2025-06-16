import { request } from '../request'
import type { paths } from '../sdk'

export type GetContactCustomFieldsResponse =
  paths['/v1/contact-custom-fields']['get']['responses']['200']['content']['application/json']

export async function getContactCustomFields() {
  return request('/v1/contact-custom-fields', 'get')
}

export type CreateContactCustomFieldResponse = unknown

export async function createContactCustomField(body: unknown): Promise<CreateContactCustomFieldResponse> {
  return request('/v1/contact-custom-fields', 'post', { body } as any) as unknown as CreateContactCustomFieldResponse
}
