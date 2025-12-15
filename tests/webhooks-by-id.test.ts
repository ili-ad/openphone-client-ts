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

test('getWebhook sends correct request', async () => {
  const id = 'wh1'
  const mock = { data: { id } }

  server.use(
    http.get(`${BASE}/v1/webhooks/${id}`, ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      return HttpResponse.json(mock)
    })
  )

  const { getWebhook } = await import('../src')
  const res = await getWebhook(id)
  expect(res).toEqual(mock)
})

test('updateWebhook sends patch with body', async () => {
  const id = 'wh2'
  const body = { label: 'test' }
  const mock = { ok: true }

  server.use(
    http.patch(`${BASE}/v1/webhooks/${id}`, async ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      expect(await request.json()).toEqual(body)
      return HttpResponse.json(mock)
    })
  )

  const { experimental } = await import('../src')
  const res = await experimental.updateWebhook(id, body)
  expect(res).toEqual(mock)
})

test('deleteWebhook sends delete', async () => {
  const id = 'wh3'
  const mock = { deleted: true }

  server.use(
    http.delete(`${BASE}/v1/webhooks/${id}`, ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      return HttpResponse.json(mock)
    })
  )

  const { deleteWebhook } = await import('../src')
  const res = await deleteWebhook(id)
  expect(res).toEqual(mock)
})
