import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const BASE = 'https://api.openphone.com'
const API_KEY = 'test-key'
process.env.QUO_BASE_URL = BASE
process.env.QUO_API_KEY = API_KEY


const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('getCallRecordings sends correct request', async () => {
  const callId = 'call1'
  const mock = { data: [] }

  server.use(
    http.get(`${BASE}/v1/call-recordings/${callId}`, ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      return HttpResponse.json(mock)
    })
  )

  const { getCallRecordings } = await import('../src')
  const res = await getCallRecordings(callId)
  expect(res).toEqual(mock)
})

test('updateCallRecording sends patch with body', async () => {
  const callId = 'call2'
  const body = { foo: 'bar' }
  const mock = { ok: true }

  server.use(
    http.patch(`${BASE}/v1/call-recordings/${callId}`, async ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      expect(await request.json()).toEqual(body)
      return HttpResponse.json(mock)
    })
  )

  const { experimental } = await import('../src')
  const res = await experimental.updateCallRecording(callId, body)
  expect(res).toEqual(mock)
})

test('deleteCallRecording sends delete', async () => {
  const callId = 'call3'
  const mock = { deleted: true }

  server.use(
    http.delete(`${BASE}/v1/call-recordings/${callId}`, ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      return HttpResponse.json(mock)
    })
  )

  const { experimental } = await import('../src')
  const res = await experimental.deleteCallRecording(callId)
  expect(res).toEqual(mock)
})
