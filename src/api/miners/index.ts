import type { Miner, MinerTaskResponse } from './types'
import { type PaginationInput, getPaginationParams } from '@/components/Pagination/usePagination'
import type { TaskState } from '@/api/tasks/types'
import type { OrderInput } from '@/api/types'
import { createRequest } from '@/libs/axios'

export default {
  detail: createRequest<number, Miner>(
    id => ({ url: `/miners/${id}` }),
  ),
  tasks: createRequest<{
    id: number
    pagination: PaginationInput
    order?: OrderInput
    state?: TaskState[]
  }, MinerTaskResponse>(
    ({ id, pagination, order, state }) => ({
      url: `/miners/${id}/tasks`,
      params: {
        ...(order ?? {}),
        ...(state?.length ? { state: state.join(',') } : {}),
        ...getPaginationParams(pagination),
      },
    }),
  ),
}
