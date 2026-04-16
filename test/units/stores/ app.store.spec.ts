import { describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '@/stores/app'
import { mockHorse } from '../../helpers/mockData'

describe('AppStore Test', () => {
  setActivePinia(createPinia())
  const store = useAppStore()

  it('should add horse and get it using horseId', () => {
    const horse = mockHorse()
    store.horses.set(horse.id, horse)
    expect(store.horses.size).toBe(1)
    expect(store.horses.get(horse.id)).toStrictEqual(horse)
  })


  it('should generate 20 horses and add them to store, all map key and value.id must be match', () => {
    store.horses.clear()
    store.generateHorses()

    expect(store.horses.size).toBe(20)
    for (const [key,value] of store.horses){
      expect(key).toBe(value.id)
    }
  })
})
