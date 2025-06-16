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

test('listCalls constructs query correctly', async () => {
  const params = {
    phoneNumberId: 'PN1',
    userId: 'US1',
    participants: ['+15555555555'],
    maxResults: 5,
  }
  const expectedPath = `/v1/calls?phoneNumberId=${params.phoneNumberId}&userId=${params.userId}&participants=%2B15555555555&maxResults=${params.maxResults}`

  server.use(
    http.get(`${BASE}${expectedPath}`, ({ request }) => {
      expect(request.headers.get('x-api-key')).toBe(API_KEY)
      return HttpResponse.json({ ok: true })
    })
  )

  const { listCalls } = await import('../src')
  const res = await listCalls(params as any)
  expect(res).toEqual({ ok: true })
})

test('createCall posts body', async () => {
  const body = { foo: 'bar' }
  server.use(
    http.post(`${BASE}/v1/calls`, async ({ request }) => {
      expect(request.headers.get('x-api-key')).toBe(API_KEY)
      expect(await request.json()).toEqual(body)
      return HttpResponse.json({ done: true })
    })
  )

  const { createCall } = await import('../src')
  const res = await createCall(body)
  expect(res).toEqual({ done: true })
})
