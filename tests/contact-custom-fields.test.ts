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

test('getContactCustomFields sends correct request', async () => {
  const mock = { data: [] }

  server.use(
    http.get(`${BASE}/v1/contact-custom-fields`, ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      return HttpResponse.json(mock)
    })
  )

  const { getContactCustomFields } = await import('../src')
  const res = await getContactCustomFields()
  expect(res).toEqual(mock)
})

test('createContactCustomField sends post with body', async () => {
  const body = { foo: 'bar' }
  const mock = { ok: true }

  server.use(
    http.post(`${BASE}/v1/contact-custom-fields`, async ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      expect(await request.json()).toEqual(body)
      return HttpResponse.json(mock)
    })
  )

  const { createContactCustomField } = await import('../src')
  const res = await createContactCustomField(body)
  expect(res).toEqual(mock)
})
