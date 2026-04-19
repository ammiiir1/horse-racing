import { describe, it, expect } from 'vitest'
import { genHorses } from '@/lib/horse'

describe('Horse Library Test', () => {
  // mock nuxtRuntimeConfig for use in genHorse function
  // @ts-ignore
  globalThis.useRuntimeConfig = () => ({
    public: {
      testMode: true
    }
  })

  it('should generate random horses with the count passed to generator function', () => {
    const cases = [10, 20, 50]
    cases.forEach((count) => {
      const horses = genHorses(count)
      expect(horses.length).toBe(count)
    })
  })

  it('should has valid horse object properties and types', () => {
    const horses = genHorses(10)
    horses.forEach((horse) => {
      expect(horse).toBeValidHorse()
    })
  })

  it('should generate unique ids for each horse', () => {
    const horses = genHorses(20)
    const ids = horses.map((h) => h.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })
})
