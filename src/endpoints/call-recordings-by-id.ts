import { request } from '../request'
import type { paths } from '../sdk'

export type GetCallRecordingsResponse =
  paths['/v1/call-recordings/{callId}']['get']['responses']['200']['content']['application/json']

export async function getCallRecordings(callId: string) {
  return request(
    `/v1/call-recordings/${callId}` as `/v1/call-recordings/{callId}`,
    'get'
  )
}

export type UpdateCallRecordingResponse = unknown

export async function updateCallRecording(
  callId: string,
  body: unknown
): Promise<UpdateCallRecordingResponse> {
  return request(
    `/v1/call-recordings/${callId}` as unknown as `/v1/call-recordings/{callId}`,
    'patch',
    { body } as any
  ) as unknown as UpdateCallRecordingResponse
}

export type DeleteCallRecordingResponse = unknown

export async function deleteCallRecording(
  callId: string
): Promise<DeleteCallRecordingResponse> {
  return request(
    `/v1/call-recordings/${callId}` as unknown as `/v1/call-recordings/{callId}`,
    'delete'
  ) as unknown as DeleteCallRecordingResponse
}
