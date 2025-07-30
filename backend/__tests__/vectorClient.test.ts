import { describe, it, expect } from 'vitest'
import vectorClient from '../src/services/vectorClient'

describe('Vector Client', () => {
  it('should embed text without throwing', async () => {
    const result = await vectorClient.embedText('hello world')
    expect(result).toBeDefined()
  })
})
