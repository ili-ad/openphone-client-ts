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

test('getMessageWebhooks sends correct request', async () => {
  const mock = { data: [] }
  server.use(
    http.get(`${BASE}/v1/webhooks/messages`, ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      return HttpResponse.json(mock)
    })
  )

  const { getMessageWebhooks } = await import('../src')
  const res = await getMessageWebhooks()
  expect(res).toEqual(mock)
})

test('createMessageWebhook sends post with body', async () => {
  const body = { events: ['message.received'], url: 'https://example.com' }
  const mock = { ok: true }

  server.use(
    http.post(`${BASE}/v1/webhooks/messages`, async ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      expect(await request.json()).toEqual(body)
      return HttpResponse.json(mock, { status: 201 })
    })
  )

  const { createMessageWebhook } = await import('../src')
  const res = await createMessageWebhook(body as any)
  expect(res).toEqual(mock)
})
