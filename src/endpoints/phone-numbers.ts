import { request } from '../request'
import type { paths } from '../sdk'

export type ListPhoneNumbersResponse =
  paths['/v1/phone-numbers']['get']['responses']['200']['content']['application/json']

export async function listPhoneNumbers(userId?: string) {
  const query = userId ? `?userId=${userId}` : ''
  return request(
    `/v1/phone-numbers${query}` as unknown as '/v1/phone-numbers',
    'get'
  )
}

export type CreatePhoneNumberResponse = unknown

export async function createPhoneNumber(
  body: unknown
): Promise<CreatePhoneNumberResponse> {
  return request(
    '/v1/phone-numbers',
    'post',
    { body } as any
  ) as unknown as CreatePhoneNumberResponse
}
