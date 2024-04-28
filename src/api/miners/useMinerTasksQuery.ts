import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { queryKeys } from '@/api/queryKeys'
import { api } from '@/api/api'
import { appConfig } from '@/config/appConfig'
import type { PaginationInput } from '@/api/pagination'
import { isTaskStateRunning } from '@/api/tasks/utils'

export function useMinerTasksQuery({ pagination }: { pagination: PaginationInput }) {
  const query = useQuery({
    queryFn: () => api.miners.tasks({
      id: appConfig.minerId,
      pagination,
      order: {
        orderby: 'last_modified',
        order: 'DESC',
      },
    }),
    queryKey: [...queryKeys.miner.tasks(), pagination],
    placeholderData: keepPreviousData,
  })

  const tasks = computed(() => {
    return (query.data.value?.task ?? []).filter((task) => !isTaskStateRunning(task.state))
  })

  return {
    ...query,
    tasks,
  }
}
