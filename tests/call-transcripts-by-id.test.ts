import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const BASE = 'https://api.openphone.com'
const API_KEY = 'test-key'
process.env.OPENPHONE_BASE_URL = BASE
process.env.OPENPHONE_API_KEY = API_KEY

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('getCallTranscript sends correct request', async () => {
  const id = 'call1'
  const mock = { data: {} }

  server.use(
    http.get(`${BASE}/v1/call-transcripts/${id}`, ({ request }) => {
      expect(request.headers.get('x-api-key')).toBe(API_KEY)
      return HttpResponse.json(mock)
    })
  )

  const { getCallTranscript } = await import('../src')
  const res = await getCallTranscript(id)
  expect(res).toEqual(mock)
})

test('updateCallTranscript sends patch with body', async () => {
  const id = 'call2'
  const body = { foo: 'bar' }
  const mock = { ok: true }

  server.use(
    http.patch(`${BASE}/v1/call-transcripts/${id}`, async ({ request }) => {
      expect(request.headers.get('x-api-key')).toBe(API_KEY)
      expect(await request.json()).toEqual(body)
      return HttpResponse.json(mock)
    })
  )

  const { updateCallTranscript } = await import('../src')
  const res = await updateCallTranscript(id, body)
  expect(res).toEqual(mock)
})

test('deleteCallTranscript sends delete', async () => {
  const id = 'call3'
  const mock = { deleted: true }

  server.use(
    http.delete(`${BASE}/v1/call-transcripts/${id}`, ({ request }) => {
      expect(request.headers.get('x-api-key')).toBe(API_KEY)
      return HttpResponse.json(mock)
    })
  )

  const { deleteCallTranscript } = await import('../src')
  const res = await deleteCallTranscript(id)
  expect(res).toEqual(mock)
})
