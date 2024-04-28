import type { TaskState } from '@/api/tasks/types'

export type Miner = {
  id: number
  name: string
  type: 'r' | 'lm'
  datasourceId: number
  metasourceId: number
  ruleSetId: number
  created?: string
  lastOpened?: string
}

export type MinerTaskResponse = {
  miner: {
    id: number
    name: string
    type: string
    tasksCount: number
  }
  task: MinerTask[]
}

export type MinerTask = {
  id: number
  name: string
  state: TaskState
  rulesCount: number
  interestMeasure: {
    name: string
    threshold: string
  }[]
  created: string
  lastModified: string
}
