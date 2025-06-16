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

test('getMessage sends correct request', async () => {
  const id = 'msg1'
  const mock = {
    data: {
      id,
      to: [],
      from: '+15555555555',
      text: 'hi',
      phoneNumberId: null,
      direction: 'incoming',
      userId: 'US1',
      status: 'sent',
      createdAt: '',
      updatedAt: '',
    },
  }

  server.use(
    http.get(`${BASE}/v1/messages/${id}`, ({ request }) => {
      expect(request.headers.get('x-api-key')).toBe(API_KEY)
      return HttpResponse.json(mock)
    })
  )

  const { getMessage } = await import('../src')
  const res = await getMessage(id)
  expect(res).toEqual(mock)
})

test('updateMessage sends patch with body', async () => {
  const id = 'msg2'
  const body = { foo: 'bar' }
  const mock = { ok: true }

  server.use(
    http.patch(`${BASE}/v1/messages/${id}`, async ({ request }) => {
      expect(request.headers.get('x-api-key')).toBe(API_KEY)
      expect(await request.json()).toEqual(body)
      return HttpResponse.json(mock)
    })
  )

  const { updateMessage } = await import('../src')
  const res = await updateMessage(id, body)
  expect(res).toEqual(mock)
})

test('deleteMessage sends delete', async () => {
  const id = 'msg3'
  const mock = { deleted: true }

  server.use(
    http.delete(`${BASE}/v1/messages/${id}`, ({ request }) => {
      expect(request.headers.get('x-api-key')).toBe(API_KEY)
      return HttpResponse.json(mock)
    })
  )

  const { deleteMessage } = await import('../src')
  const res = await deleteMessage(id)
  expect(res).toEqual(mock)
})
