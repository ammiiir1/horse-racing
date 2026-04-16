import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect } from 'vitest'
import RaceTrack from '@/components/RaceTrack/RaceTrack.vue'
import { mockRaceStatus } from '../../helpers/mockData'

describe('Race Track Render', () => {
  it('should render mock data', async () => {
    const store = useAppStore()
    const mockData = mockRaceStatus()

    store.raceStatus = mockData
    const component = await mountSuspended(RaceTrack)

    // must have 10 lanes
    expect(component.findAll('.lane')).toHaveLength(10)
  })
})
