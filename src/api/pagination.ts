import { createEventHook } from '@vueuse/core'
import { type ComputedRef, type Ref, computed, reactive, ref } from 'vue'

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
  state?: {
    page: number
    pageSize: number
  }
} = {}) {
  const state = reactive(options.state ?? createPaginationState())

  let totalGetter = () => 0

  const total = computed(() => totalGetter())

  const totalPages = computed(() => {
    if (!total.value) return 1
    return Math.ceil(total.value / state.pageSize)
  })

  const pageChangeHook = createEventHook()

  function setPage(value: number) {
    state.page = value
    pageChangeHook.trigger()
  }

  function setTotalGetter(getter: () => number) {
    totalGetter = getter
  }

  function setPageSize(value: number) {
    state.pageSize = value
    if (state.page > totalPages.value) {
      setPage(totalPages.value)
    }
  }

  const bindings = computed(() => ({
    'onUpdate:page': setPage,
    'onUpdate:pageSize': setPageSize,
    'page': state.page,
    'pageSize': state.pageSize,
    'totalPages': totalPages.value,
  }))

  return {
    bindings,
    state,
    setTotalGetter,
    onPageChange: pageChangeHook.on,
  }
}
