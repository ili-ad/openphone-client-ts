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

test('listCallWebhooks sends correct request', async () => {
  const mock = { data: [] }

  server.use(
    http.get(`${BASE}/v1/webhooks/calls`, ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      return HttpResponse.json(mock)
    })
  )

  const { listCallWebhooks } = await import('../src')
  const res = await listCallWebhooks()
  expect(res).toEqual(mock)
})

test('createCallWebhook sends post with body', async () => {
  const body = { url: 'https://example.com', events: ['call.ringing'] }
  const mock = { data: { id: 'wh1' } }

  server.use(
    http.post(`${BASE}/v1/webhooks/calls`, async ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      expect(await request.json()).toEqual(body)
      return HttpResponse.json(mock, { status: 201 })
    })
  )

  const { createCallWebhook } = await import('../src')
  const res = await createCallWebhook(body as any)
  expect(res).toEqual(mock)
})
