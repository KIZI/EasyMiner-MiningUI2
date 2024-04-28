import { computed, reactive } from 'vue'

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

export const PAGE_SIZES = [8, 16, 32, 64]

export function usePagination() {
  const state = reactive({
    page: 1,
    pageSize: PAGE_SIZES[0],
  })

  function setPage(value: number) {
    state.page = value
  }

  function setPageSize(value: number) {
    state.pageSize = value
  }

  const bind = computed(() => ({
    'onUpdate:page': setPage,
    'onUpdate:pageSize': setPageSize,
    'page': state.page,
    'pageSize': state.pageSize,
    'totalPages': 10,
  }))

  return {
    bind,
    state,
  }
}
