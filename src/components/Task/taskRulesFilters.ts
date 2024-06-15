import { type Ref, ref } from 'vue'
import { createPaginationState } from '@/api/pagination'

type InterestMeasureFilter = [number, number]

export type TaskRulesFilters = {
  antecedent: string
  consequent: string
  support: InterestMeasureFilter
  confidence: InterestMeasureFilter
  lift: InterestMeasureFilter
  orderBy: string
  pagination: {
    page: number
    pageSize: number
  }
}

export const orderOptions = [
  {
    label: 'Found order',
    value: 'found',
  },
  {
    label: 'Confidence',
    value: 'confidence',
  },
  {
    label: 'Support',
    value: 'support',
  },
]

export function createTaskRulesFilters(): Ref<TaskRulesFilters> {
  return ref({
    antecedent: '',
    consequent: '',
    orderBy: orderOptions[0].value,
    pagination: createPaginationState(),
    confidence: [0, 1],
    support: [0, 1],
    lift: [0, 5],
  })
}
