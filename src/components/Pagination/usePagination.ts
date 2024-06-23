import type { MaybeRef } from 'vue'
import { computed, reactive, toValue } from 'vue'

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

export type Pagination = ReturnType<typeof usePagination>

export function usePagination(options: {
  state?: {
    page: number
    pageSize: number
  }
  totalCount?: MaybeRef<number>
} = {}) {
  const state = options.state ?? reactive(createPaginationState())

  let totalGetter = () => toValue(options.totalCount) ?? 0
  function setTotalGetter(getter: () => number) {
    totalGetter = getter
  }
  const total = computed(() => totalGetter())

  const totalPages = computed(() => {
    if (!total.value) return 1
    return Math.ceil(total.value / state.pageSize)
  })

  const isFirstPage = computed(() => state.page === 1)
  const isLastPage = computed(() => state.page === totalPages.value)

  function setPage(value: number) {
    state.page = value
  }

  function previous() {
    if (isFirstPage.value) return
    setPage(state.page - 1)
  }

  function next() {
    if (isLastPage.value) return
    setPage(state.page + 1)
  }

  function setPageSize(value: number) {
    state.pageSize = value
    if (state.page > totalPages.value) {
      setPage(totalPages.value)
    }
  }

  function reset() {
    state.page = 1
    state.pageSize = PAGE_SIZES[0]
  }

  return reactive({
    state,
    setTotalGetter,
    previous,
    next,
    setPageSize,
    setPage,
    totalPages,
    isFirstPage,
    isLastPage,
    reset,
  })
}
