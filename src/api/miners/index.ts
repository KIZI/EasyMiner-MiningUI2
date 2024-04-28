import type { Miner, MinerTaskResponse } from './types'
import { type PaginationInput, getPaginationParams } from '@/api/pagination'
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
  }, MinerTaskResponse>(
    ({ id, pagination, order }) => ({
      url: `/miners/${id}/tasks`,
      params: {
        ...(order ?? {}),
        ...getPaginationParams(pagination),
      },
    }),
  ),
}
