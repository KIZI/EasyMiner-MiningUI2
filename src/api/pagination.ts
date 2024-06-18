import { createEventHook } from '@vueuse/core'
import type { MaybeRef } from 'vue'
import { type Ref, computed, ref, toValue } from 'vue'

export type PaginationInput = {
  page: number
  pageSize: number
}

export function getPaginationParams(pagination: PaginationInput) {
  return {
    offset: (pagination.page - 1) * pagination.pageSize,
    limit: pagination.pageSize,
  }
}

export const PAGE_SIZES = [10, 20, 50, 100]

export function createPaginationState() {
  return {
    page: 1,
    pageSize: PAGE_SIZES[0],
  }
}

export function usePagination(options: {
  state?: Ref<{
    page: number
    pageSize: number
  }>
  totalCount?: MaybeRef<number>
} = {}) {
  const state = options.state ?? ref(createPaginationState())

  let totalGetter = () => toValue(options.totalCount) ?? 0

  const total = computed(() => totalGetter())

  const totalPages = computed(() => {
    if (!total.value) return 1
    return Math.ceil(total.value / state.value.pageSize)
  })

  const pageChangeHook = createEventHook()

  function setPage(value: number) {
    state.value.page = value
    pageChangeHook.trigger()
  }

  function setTotalGetter(getter: () => number) {
    totalGetter = getter
  }

  function setPageSize(value: number) {
    state.value.pageSize = value
    if (state.value.page > totalPages.value) {
      setPage(totalPages.value)
    }
  }

  const bindings = computed(() => ({
    'onUpdate:page': setPage,
    'onUpdate:pageSize': setPageSize,
    'page': state.value.page,
    'pageSize': state.value.pageSize,
    'totalPages': totalPages.value,
  }))

  return {
    bindings,
    state,
    setTotalGetter,
    onPageChange: pageChangeHook.on,
  }
}
