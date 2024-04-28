import type { DatasourceColumnType } from '@/api/datasources/types'

export type Metasource = {
  id: number
  type: string
  name: string
  ppDatasetId: number
  state: MetasourceState
  attribute: MetasourceAttribute[]
}

export type MetasourceAttribute = {
  id: number
  name: string
  type: DatasourceColumnType
  datasourceColumnId: number
  preprocessingId: number
  uniqueValues: number
  active: boolean
}

export type MetasourceState = 'available' | 'unavailable' | 'preparation'
