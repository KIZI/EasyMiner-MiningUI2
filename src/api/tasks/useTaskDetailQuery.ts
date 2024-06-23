import { type UseQueryOptions, useQuery } from '@tanstack/vue-query'
import { type MaybeRef, computed, toValue } from 'vue'
import { api } from '@/api/api'
import type { Optional } from '@/libs/vueQuery'
import type { TaskWithSettings } from '@/api/tasks/types'

export type TaskDetailQueryParams = {
  queryParams?: Partial<UseQueryOptions<TaskWithSettings>>
}

export function useTaskDetailQuery(id: MaybeRef<Optional<number>>, params: TaskDetailQueryParams = {}) {
  const query = useQuery({
    enabled: computed(() => Boolean(toValue(id))),
    queryFn: () => api.tasks.detail(toValue(id)!),
    queryKey: ['tasksDetail', id],
    ...params.queryParams,
  })

  return {
    ...query,
    task: query.data,
  }
}
