import { useQuery } from '@tanstack/vue-query'
import { type MaybeRef, computed, toValue } from 'vue'
import { api } from '@/api/api'
import type { Optional } from '@/libs/vueQuery'

export function useTaskDetailQuery(id: MaybeRef<Optional<number>>) {
  const query = useQuery({
    enabled: computed(() => Boolean(toValue(id))),
    queryFn: () => api.tasks.detail(toValue(id)!),
    queryKey: ['tasksDetail', id],
  })

  return {
    ...query,
    task: query.data,
  }
}
