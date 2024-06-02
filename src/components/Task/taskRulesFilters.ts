import { type Ref, ref } from 'vue'
import { createPaginationState } from '@/api/pagination'

export type TaskRulesFilters = {
  antecedent: string
  consequent: string
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
  })
}
