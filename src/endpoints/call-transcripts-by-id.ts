import { request } from '../request'
import type { paths } from '../sdk'

export type GetCallTranscriptResponse =
  paths['/v1/call-transcripts/{id}']['get']['responses']['200']['content']['application/json']

export async function getCallTranscript(id: string) {
  return request(
    `/v1/call-transcripts/${id}` as `/v1/call-transcripts/{id}`,
    'get'
  )
}

export type UpdateCallTranscriptResponse = unknown

export async function updateCallTranscript(id: string, body: unknown): Promise<UpdateCallTranscriptResponse> {
  return request(
    `/v1/call-transcripts/${id}` as unknown as `/v1/call-transcripts/{id}`,
    'patch',
    { body } as any
  ) as unknown as UpdateCallTranscriptResponse
}

export type DeleteCallTranscriptResponse = unknown

export async function deleteCallTranscript(id: string): Promise<DeleteCallTranscriptResponse> {
  return request(
    `/v1/call-transcripts/${id}` as unknown as `/v1/call-transcripts/{id}`,
    'delete'
  ) as unknown as DeleteCallTranscriptResponse
}
