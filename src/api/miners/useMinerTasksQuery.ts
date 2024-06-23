import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { type MaybeRef, computed, toValue } from 'vue'
import { queryKeys } from '@/api/queryKeys'
import { api } from '@/api/api'
import { appConfig } from '@/config/appConfig'
import type { PaginationInput } from '@/components/Pagination/usePagination'
import { isTaskStateRunning } from '@/api/tasks/utils'
import type { TaskState } from '@/api/tasks/types'

export function useMinerTasksQuery({
  pagination,
  state,
}: {
  pagination: MaybeRef<PaginationInput>
  state?: MaybeRef<TaskState[]>
}) {
  const query = useQuery({
    queryFn: () => api.miners.tasks({
      id: appConfig.minerId,
      pagination: toValue(pagination),
      order: {
        orderby: 'last_modified',
        order: 'DESC',
      },
      state: toValue(state),
    }),
    queryKey: [...queryKeys.miner.tasks(), pagination, state],
    placeholderData: keepPreviousData,
  })

  const tasks = computed(() => {
    return (query.data.value?.task ?? []).filter(task => !isTaskStateRunning(task.state))
  })

  return {
    ...query,
    tasks,
  }
}
