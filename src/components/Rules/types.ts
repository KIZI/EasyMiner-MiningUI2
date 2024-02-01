export type CedentFilter = Map<string, CedentFilterItem>;

export interface CedentFilterItem {
  attribute: string,
  values: string[],
  valueType: 'any' | 'fixed',
}
