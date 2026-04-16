import type { ID } from '../types/app'

export interface IHorse {
  id: ID
  name: string
  /** condition: 1-100 */
  condition: number
  /** color: any valid css color */
  color: string
  races: number
  wins: number
}
export interface IRaceRound {
  id: ID
  /** round: 1-6 */
  round: number
  /** length: 1200, 1400, 1600, 1800, 2000, 2200 */
  length: number
  isDone: boolean
  startTime: number
  finishTime: number
  results: {
    horseId: ID
    position: number
  }[]
}
export interface IRaceProgram {
  id: ID
  createdAt: number
  finishedAt: number
  /** horses: 10 horses */
  horses: ID[]
  /** rounds: an Array of 6 rounds */
  rounds: IRaceRound[]
  isDone: boolean
}

export interface IHorseRaceData extends IHorse {
  xPos: number
  todaysCondition: number
}

export interface IRaceStatus {
  totalTime: number
  spentTime: number
  roundData: IRaceRound | undefined
  horsesData: IHorseRaceData[]
  isStarted: boolean
}
