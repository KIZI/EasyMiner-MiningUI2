export type CedentFilter = Map<string, CedentFilterItem>

export type CedentFilterItem = {
  attribute: string
  values: string[]
  valueType: 'any' | 'fixed'
}
