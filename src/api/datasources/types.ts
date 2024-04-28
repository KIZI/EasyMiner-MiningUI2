export type Datasource = {
  id: number
  type: string
  name: string
  dbDatasourceId: number
  available: boolean
  size: number
  column: DatasourceColumn[]
}

export type DatasourceColumn = {
  id: number
  name: string
  type: DatasourceColumnType
  uniqueValues: number
  active: boolean
}

export type DatasourceColumnType = 'number' | 'nominal'
