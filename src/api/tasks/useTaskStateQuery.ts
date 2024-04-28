import { type QueryObserverOptions, useQuery } from '@tanstack/vue-query'
import { computed, toValue } from 'vue'
import type { MaybeRef, Ref } from 'vue'
import { api } from '@/api/api'
import type { Optional } from '@/libs/vueQuery'
import type { Task } from '@/api/tasks/types'

export function useTaskStateQuery(taskId: MaybeRef<Optional<number>>, {
  signal,
  refetchInterval,
}: {
  signal?: Ref<AbortSignal>
  refetchInterval?: QueryObserverOptions<Task>['refetchInterval']
} = {}) {
  const query = useQuery({
    enabled: computed(() => !!(toValue(taskId))),
    queryFn: () => api.tasks.state(toValue(taskId)!, { signal: toValue(signal) }),
    queryKey: ['taskState', taskId],
    refetchInterval,
  })

  const state = computed(() => query.data.value?.state)

  return {
    ...query,
    state,
  }
}
