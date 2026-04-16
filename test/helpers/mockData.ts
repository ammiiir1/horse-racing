import type { IHorse } from '@/typescript/interfaces/app'
import type { ID } from '../../app/typescript/types/app'

export const mockHorse = (overrides?: Partial<IHorse>): IHorse => {
  return {
    id: '9112d383-e7a2-4101-8ad9-3e8fc84cefcf' as ID,
    name: 'Sky Storm',
    condition: 66,
    color: 'hsl(194, 30%, 50%)',
    races: 0,
    wins: 0,
    ...overrides
  }
}
