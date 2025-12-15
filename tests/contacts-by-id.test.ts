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

test('getContact sends correct request', async () => {
  const id = 'c1'
  const mock = { data: { id } }

  server.use(
    http.get(`${BASE}/v1/contacts/${id}`, ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      return HttpResponse.json(mock)
    })
  )

  const { getContact } = await import('../src')
  const res = await getContact(id)
  expect(res).toEqual(mock)
})

test('updateContact sends patch with body', async () => {
  const id = 'c2'
  const body = { externalId: 'e1' }
  const mock = { ok: true }

  server.use(
    http.patch(`${BASE}/v1/contacts/${id}`, async ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      expect(await request.json()).toEqual(body)
      return HttpResponse.json(mock)
    })
  )

  const { updateContact } = await import('../src')
  const res = await updateContact(id, body as any)
  expect(res).toEqual(mock)
})

test('deleteContact sends delete', async () => {
  const id = 'c3'
  const mock = { deleted: true }

  server.use(
    http.delete(`${BASE}/v1/contacts/${id}`, ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      return HttpResponse.json(mock)
    })
  )

  const { deleteContact } = await import('../src')
  const res = await deleteContact(id)
  expect(res).toEqual(mock)
})
