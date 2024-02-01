import type { DatasourceColumnType } from '@/api/datasources/types';

export interface Metasource {
  id: number,
  type: string,
  name: string,
  ppDatasetId: number,
  state: MetasourceState,
  attribute: MetasourceAttribute[]
}

export interface MetasourceAttribute {
  id: number;
  name: string;
  type: DatasourceColumnType;
  datasourceColumnId: number;
  preprocessingId: number;
  uniqueValues: number;
  active: boolean;
}

export type MetasourceState = 'available' | 'unavailable' | 'preparation';
