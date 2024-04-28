import type { ValueOf } from 'type-fest'
import type { MetasourceAttribute } from '@/api/metasources/types'

export const CEDENT = {
  Antecedent: 'Antecedent',
  Consequent: 'Consequent',
} as const
export type Cedent = ValueOf<typeof CEDENT>

export type CedentItem = MetasourceAttribute & {
  cedent: Cedent
  fixedValue?: any
  isNegated?: boolean
}
