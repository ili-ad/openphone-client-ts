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

test('listConversations sends correct request', async () => {
  const mock = { data: [] }

  server.use(
    http.get(`${BASE}/v1/conversations`, ({ request }) => {
      expect(request.headers.get('x-api-key')).toBe(API_KEY)
      return HttpResponse.json(mock)
    })
  )

  const { listConversations } = await import('../src')
  const res = await listConversations()
  expect(res).toEqual(mock)
})

test('createConversation posts body', async () => {
  const body = { foo: 'bar' }
  const mock = { ok: true }

  server.use(
    http.post(`${BASE}/v1/conversations`, async ({ request }) => {
      expect(request.headers.get('x-api-key')).toBe(API_KEY)
      expect(await request.json()).toEqual(body)
      return HttpResponse.json(mock)
    })
  )

  const { createConversation } = await import('../src')
  const res = await createConversation(body)
  expect(res).toEqual(mock)
})
