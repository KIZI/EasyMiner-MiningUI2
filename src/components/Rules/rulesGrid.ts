import { createInjectionState } from '@vueuse/core'
import { computed, reactive, toRef, watch } from 'vue'
import type { MaybeRef, TransitionGroupProps } from 'vue'
import type { Entries, RequiredDeep } from 'type-fest'
import { createPaginationState, usePagination } from '@/components/Pagination/usePagination'
import type { TaskRule, TaskRulesInput } from '@/api/tasks/types'
import { useSelectionModel } from '@/composables/useSelectionModel'
import type { Optional } from '@/libs/vueQuery'
import type { TaskRulesQueryOptions } from '@/api/tasks/useTaskRulesQuery'

export type TaskRulesDataParams = RequiredDeep<TaskRulesQueryOptions>

export const orderOptions = [{ label: 'ascending', value: 'ASC' }, { label: 'descending', value: 'DESC' }]

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

function getDefaultFiltersState() {
  return {
    antecedent: '',
    consequent: '',
    support: { from: '', to: '' },
    confidence: { from: '', to: '' },
    lift: { from: '', to: '' },
  } satisfies TaskRulesDataParams['filters']
}

function getDefaultOrderState() {
  return {
    orderBy: taskRulesOrderOptions[0].value,
    order: 'ASC',
  } satisfies TaskRulesDataParams['order']
}

type ToOptionalRefs<T> = {
  [K in keyof T]: MaybeRef<Optional<T[K]>>
}

export function createTaskRulesDataParams() {
  return {
    filters: getDefaultFiltersState(),
    order: getDefaultOrderState(),
    pagination: createPaginationState(),
  }
}

export const [useRulesGrid, injectRulesGrid] = createInjectionState((options: {
  filterByMeasures?: boolean
} = {
  filterByMeasures: false,
}) => {
  const dataState = reactive<{
    rules: TaskRule[]
    totalCount: number
    isLoading: boolean
    isRefetching: boolean
  }>({
    rules: [],
    totalCount: 0,
    isLoading: false,
    isRefetching: false,
  })

  function setDataState(state: ToOptionalRefs<typeof dataState>) {
    Object.assign(dataState, state)
  }

  const uiState = reactive<{
    getItemProps: (item: TaskRule) => Record<string, unknown> | undefined
    transitionGroup: TransitionGroupProps
  }>({ getItemProps: () => ({}), transitionGroup: {} })

  function setUiState(state: Partial<ToOptionalRefs<typeof uiState>>) {
    Object.assign(uiState, state)
  }

  const eventHandlers = {
    addSelected: async () => {},
    removeSelected: async () => {},
  }

  function setEventHandlers(handlers: Partial<typeof eventHandlers>) {
    (Object.entries(handlers) as Entries<typeof eventHandlers>).forEach(([key, handler]) => {
      eventHandlers[key] = handler
    })
  }

  const pagination = usePagination({ totalCount: toRef(dataState, 'totalCount') })
  const filters = reactive(getDefaultFiltersState())
  const order = reactive(getDefaultOrderState())

  watch(filters, pagination.reset)

  const selectionModel = useSelectionModel({
    items: toRef(dataState, 'rules'),
    itemIdentity: item => item.id,
  })
  const selection = toRef(selectionModel, 'selection')

  function resetFilters() {
    Object.assign(filters, getDefaultFiltersState())
    pagination.reset()
  }
  function reset() {
    resetFilters()
    Object.assign(order, getDefaultOrderState())
    selectionModel.clear()
  }

  const isAnyFilterActive = computed(() => {
    return JSON.stringify(filters) !== JSON.stringify(getDefaultFiltersState())
  })

  const requestParams = computed(() => ({
    filters,
    order,
    pagination: pagination.state,
  }))

  const hasRules = computed(() => {
    return dataState.rules.length > 0
  })

  return {
    options,
    filters,
    order,
    pagination,
    selection,
    selectionModel,
    requestParams,
    isAnyFilterActive,
    hasRules,
    eventHandlers,
    uiState,
    dataState,
    reset,
    resetFilters,
    setDataState,
    setUiState,
    setEventHandlers,
  }
})
