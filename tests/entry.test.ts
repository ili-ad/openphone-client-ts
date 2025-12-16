import { describe, expect, it } from 'vitest'

describe('package entry', () => {
  it('exports the public API surface', async () => {
    process.env.QUO_API_KEY = process.env.QUO_API_KEY ?? 'test-key'
    const entry = await import('../src')
    expect(entry).toBeTruthy()
  })
})
