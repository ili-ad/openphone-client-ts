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

test('listMessages sends correct query', async () => {
  const query = {
    phoneNumberId: 'PN1',
    participants: ['+15551234567'],
    maxResults: 10,
  }
  const mock = { data: [], totalItems: 0, nextPageToken: null }

  server.use(
    http.get(`${BASE}/v1/messages`, ({ request }) => {
      const url = new URL(request.url)
      expect(request.headers.get('authorization')).toBe(API_KEY)
      expect(url.searchParams.get('phoneNumberId')).toBe(query.phoneNumberId)
      expect(url.searchParams.getAll('participants')).toEqual(query.participants)
      expect(url.searchParams.get('maxResults')).toBe(String(query.maxResults))
      return HttpResponse.json(mock)
    })
  )

  const { listMessages } = await import('../src')
  const res = await listMessages(query as any)
  expect(res).toEqual(mock)
})

test('listMessages rejects empty participants', async () => {
  const query = { phoneNumberId: 'PN1', participants: [], maxResults: 10 }
  const { listMessages } = await import('../src')
  await expect(listMessages(query as any)).rejects.toThrow('participants')
})

test('sendMessage posts body', async () => {
  const body = {
    content: 'hi',
    from: 'PN1',
    to: ['+15551234567'],
  }
  const mock = { data: { id: 'm1' } }

  server.use(
    http.post(`${BASE}/v1/messages`, async ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      expect(await request.json()).toEqual(body)
      return HttpResponse.json(mock, { status: 202 })
    })
  )

  const { sendMessage } = await import('../src')
  const res = await sendMessage(body as any)
  expect(res).toEqual(mock)
})

test('sendMessage enforces one recipient', async () => {
  const body = { content: 'hi', from: 'PN1', to: ['+1555', '+1666'] }
  const { sendMessage } = await import('../src')
  await expect(sendMessage(body as any)).rejects.toThrow('recipient')
})
