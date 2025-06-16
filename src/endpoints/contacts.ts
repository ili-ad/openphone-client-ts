import { request } from '../request'
import type { paths } from '../sdk'

export type GetContactsResponse =
  paths['/v1/contacts']['get']['responses']['200']['content']['application/json']

export type ListContactsParams =
  paths['/v1/contacts']['get']['parameters']['query']

export async function getContacts(params: ListContactsParams) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const v of value) query.append(key, String(v))
    } else if (value !== undefined && value !== null) {
      query.append(key, String(value))
    }
  }
  const q = query.toString()
  return request(
    (`/v1/contacts${q ? `?${q}` : ''}`) as unknown as '/v1/contacts',
    'get'
  )
}

export type CreateContactResponse =
  paths['/v1/contacts']['post']['responses']['201']['content']['application/json']

export type CreateContactBody =
  paths['/v1/contacts']['post']['requestBody']['content']['application/json']

export async function createContact(
  body: CreateContactBody
): Promise<CreateContactResponse> {
  return request(
    '/v1/contacts',
    'post',
    { body } as any
  ) as Promise<CreateContactResponse>
}
