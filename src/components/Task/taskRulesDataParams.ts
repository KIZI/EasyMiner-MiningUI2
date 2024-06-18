import { type Ref, ref } from 'vue'
import type { RequiredDeep } from 'type-fest'
import { createPaginationState } from '@/api/pagination'
import type { TaskRulesQueryOptions } from '@/api/tasks/useTaskRulesQuery'
import type { TaskRulesInput } from '@/api/tasks/types'
import { difference } from 'lodash-es'

export const taskRulesOrderOptions = [
  {
    label: 'Found order',
    value: 'default',
  },
  {
    label: 'Confidence',
    value: 'conf',
  },
  {
    label: 'Support',
    value: 'supp',
  },
  {
    label: 'Lift',
    value: 'lift',
  },
] satisfies { label: string, value: TaskRulesInput['orderby'] }[]

export const orderOptions = [{ label: 'asc', value: 'ASC' }, { label: 'desc', value: 'DESC' }]

export type TaskRulesDataParams = RequiredDeep<TaskRulesQueryOptions>

export function createTaskRulesDataParams() {
  return {
    filters: {
      antecedent: '',
      consequent: '',
      support: { from: null, to: null },
      confidence: { from: null, to: null },
      lift: { from: null, to: null },
    },
    order: {
      orderBy: taskRulesOrderOptions[0].value,
      order: 'ASC',
    },
    pagination: createPaginationState(),
  } satisfies TaskRulesDataParams
}

export function isTaskRulesDataParamsTouched(params: TaskRulesDataParams) {
  return JSON.stringify(params) !== JSON.stringify(createTaskRulesDataParams())
}