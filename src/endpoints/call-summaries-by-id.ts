import { request } from '../request'
import type { paths } from '../sdk'

export type GetCallSummaryResponse =
  paths['/v1/call-summaries/{callId}']['get']['responses']['200']['content']['application/json']

export async function getCallSummary(callId: string) {
  return request(
    `/v1/call-summaries/${callId}` as `/v1/call-summaries/{callId}`,
    'get'
  )
}

export type UpdateCallSummaryResponse = unknown

export async function updateCallSummary(
  callId: string,
  body: unknown
): Promise<UpdateCallSummaryResponse> {
  return request(
    `/v1/call-summaries/${callId}` as unknown as `/v1/call-summaries/{callId}`,
    'patch',
    { body } as any
  ) as unknown as UpdateCallSummaryResponse
}

export type DeleteCallSummaryResponse = unknown

export async function deleteCallSummary(
  callId: string
): Promise<DeleteCallSummaryResponse> {
  return request(
    `/v1/call-summaries/${callId}` as unknown as `/v1/call-summaries/{callId}`,
    'delete'
  ) as unknown as DeleteCallSummaryResponse
}
