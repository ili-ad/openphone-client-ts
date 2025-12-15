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
      expect(request.headers.get('authorization')).toBe(API_KEY)
      return HttpResponse.json({ ok: true })
    })
  )

  const { listCalls } = await import('../src')
  const res = await listCalls(params as any)
  expect(res).toEqual({ ok: true })
})

test('listCalls rejects empty participants', async () => {
  const params = {
    phoneNumberId: 'PN1',
    participants: [],
    maxResults: 5,
  }

  const { listCalls } = await import('../src')
  await expect(listCalls(params as any)).rejects.toThrow('participants')
})

test('listCalls rejects deprecated since param', async () => {
  const params = {
    phoneNumberId: 'PN1',
    participants: ['+15555555555'],
    maxResults: 5,
    since: '2025-01-01T00:00:00Z',
  }

  const { listCalls } = await import('../src')
  await expect(listCalls(params as any)).rejects.toThrow('since')
})

test('listCalls rejects createdAfter after createdBefore', async () => {
  const params = {
    phoneNumberId: 'PN1',
    participants: ['+15555555555'],
    maxResults: 5,
    createdAfter: '2025-01-02T00:00:00Z',
    createdBefore: '2025-01-01T00:00:00Z',
  }

  const { listCalls } = await import('../src')
  await expect(listCalls(params as any)).rejects.toThrow('createdAfter must be <= createdBefore')
})

test('createCall posts body', async () => {
  const body = { foo: 'bar' }
  server.use(
    http.post(`${BASE}/v1/calls`, async ({ request }) => {
      expect(request.headers.get('authorization')).toBe(API_KEY)
      expect(await request.json()).toEqual(body)
      return HttpResponse.json({ done: true })
    })
  )

  const { experimental } = await import('../src')
  const res = await experimental.createCall(body)
  expect(res).toEqual({ done: true })
})
