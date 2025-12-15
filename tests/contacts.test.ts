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

const url = `${BASE}/v1/contacts`

test('getContacts sends query params', async () => {
  const params = { externalIds: ['a', 'b'], maxResults: 5 }
  const mock = { data: [] }
  server.use(
    http.get(url, ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      const u = new URL(request.url)
      expect(u.searchParams.getAll('externalIds')).toEqual(['a', 'b'])
      expect(u.searchParams.get('maxResults')).toBe('5')
      return HttpResponse.json(mock)
    })
  )

  const { getContacts } = await import('../src')
  const res = await getContacts(params as any)
  expect(res).toEqual(mock)
})

test('createContact posts body', async () => {
  const body = { defaultFields: { firstName: 'x' } }
  const mock = { ok: true }
  server.use(
    http.post(url, async ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      expect(await request.json()).toEqual(body)
      return HttpResponse.json(mock, { status: 201 })
    })
  )

  const { createContact } = await import('../src')
  const res = await createContact(body as any)
  expect(res).toEqual(mock)
})
