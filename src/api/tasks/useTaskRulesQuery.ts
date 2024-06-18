import { type QueryObserverOptions, keepPreviousData, useQuery, type UseQueryOptions } from '@tanstack/vue-query'
import { computed, toValue } from 'vue'
import type { MaybeRef, Ref } from 'vue'
import { api } from '@/api/api'
import type { Optional } from '@/libs/vueQuery'
import { isTaskStateRunning } from '@/api/tasks/utils'
import type { TaskRulesInput, TasksRulesResponse } from '@/api/tasks/types'
import { type PaginationInput, getPaginationParams } from '@/api/pagination'

type InterestMeasureFilter = { from?: number | null, to?: number | null }

export type TaskRulesQueryOptions = {
  pagination?: PaginationInput
  order?: {
    orderBy?: TaskRulesInput['orderby']
    order?: TaskRulesInput['order']
  }
  filters?: {
    antecedent?: string
    consequent?: string
    support?: InterestMeasureFilter
    confidence?: InterestMeasureFilter
    lift?: InterestMeasureFilter
  }
}

export type TaskRulesQueryParams = {
  options?: MaybeRef<TaskRulesQueryOptions>
  signal?: Ref<AbortSignal>
  keepPreviousData?: boolean
  queryOptions?: Partial<UseQueryOptions<TasksRulesResponse>>
}

function cleanParams(params: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      if (Array.isArray(value)) return !!value.length
      if (typeof value === 'string') return !!value

      return value !== undefined && value !== null
    }),
  )
}

export function useTaskRulesQuery(
  taskId: MaybeRef<Optional<number>>,
  params: TaskRulesQueryParams = {},
) {
  const { data, ...query } = useQuery<TasksRulesResponse>({
    queryKey: ['taskRules', taskId, params.options],
    enabled: computed(() => Boolean(toValue(taskId))),
    queryFn: () => {
      const {
        pagination,
        order,
        filters,
      } = toValue(params.options) ?? {}

      return api.tasks.rules({
        id: toValue(taskId)!,
        ...pagination && getPaginationParams(pagination),
        ...cleanParams({
          order: order?.order,
          orderby: order?.orderBy,
          minConf: filters?.confidence?.from,
          maxConf: filters?.confidence?.to,
          minSupp: filters?.support?.from,
          maxSupp: filters?.support?.to,
          minLift: filters?.lift?.from,
          maxLift: filters?.lift?.to,
          searchAntecedent: filters?.antecedent,
          searchConsequent: filters?.consequent,
        }),
      }, { signal: toValue(params.signal) })
    },
    ...params.keepPreviousData && { placeholderData: keepPreviousData },
    ...params.queryOptions,
  })

  const task = computed(() => data.value?.task)
  const rulesCount = computed(() => data.value?.rulesCount)
  const rules = computed(() => data.value?.rules ?? [])
  const state = computed(() => task.value?.state)

  const isNoRulesDiscovered = computed(() => {
    if (!task.value) return false
    if (isTaskStateRunning(task.value.state)) return false

    return !!rules.value.length
  })

  return {
    ...query,
    rules,
    task,
    state,
    isNoRulesDiscovered,
    rulesCount,
  }
}
