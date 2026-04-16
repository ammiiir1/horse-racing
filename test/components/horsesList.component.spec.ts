import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi } from 'vitest'
import HorsesList from '@/components/HorsesList/HorsesList.vue'
import { mockHorse } from '../helpers/mockData'
import type { ID } from '~/typescript/types/app'

// mock the composable used in the component
vi.mock('@/composables/useRaceProgramHorses', () => ({
  useRaceProgramHorses: (id: string) => ({
    raceProgramHorses: ref([mockHorse({ name: 'Mock Horse' })])
  })
}))

describe('HorsesList component render test', () => {
  const horse1 = mockHorse({ id: 'h1' as ID })
  const horse2 = mockHorse({ id: 'h2' as ID })
  const mockHorsesList = [horse1, horse2]

  it('should renders the horses list provided via props', async () => {
    const component = await mountSuspended(HorsesList, {
      props: { horses: mockHorsesList }
    })

    expect(component.text()).toContain(horse1.name)
    expect(component.text()).toContain(horse2.name)
    expect(component.findAll('.el-table__row')).toHaveLength(mockHorsesList.length)
  })

  it('it renders horses from composable if raceProgramId is provided', async () => {
    const component = await mountSuspended(HorsesList, {
      props: { raceProgramId: 'some-id' as ID }
    })

    // should show the mock horse from our vi.mock above
    expect(component.text()).toContain('Mock Horse')
  })
})
