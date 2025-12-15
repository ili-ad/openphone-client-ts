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


test('getCallTranscriptWebhooks sends correct request', async () => {
  const mock = { data: [] }

  server.use(
    http.get(`${BASE}/v1/webhooks/call-transcripts`, ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      return HttpResponse.json(mock)
    })
  )

  const { experimental } = await import('../src')
  const res = await experimental.getCallTranscriptWebhooks()
  expect(res).toEqual(mock)
})

test('createCallTranscriptWebhook posts body', async () => {
  const body = { events: ['call.transcript.completed'], url: 'https://ex.com' }
  const mock = { ok: true }

  server.use(
    http.post(`${BASE}/v1/webhooks/call-transcripts`, async ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      expect(await request.json()).toEqual(body)
      return HttpResponse.json(mock, { status: 201 })
    })
  )

  const { createCallTranscriptWebhook } = await import('../src')
  const res = await createCallTranscriptWebhook(body as any)
  expect(res).toEqual(mock)
})
