import { type Ref, computed, reactive } from 'vue'

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

  function setPage(value: number) {
    state.page = value
  }

  function setPageSize(value: number) {
    state.pageSize = value
  }

  const bindings = computed(() => ({
    'onUpdate:page': setPage,
    'onUpdate:pageSize': setPageSize,
    'page': state.page,
    'pageSize': state.pageSize,
    'totalPages': 10,
  }))

  return reactive({
    bindings,
    state,
  })
}
