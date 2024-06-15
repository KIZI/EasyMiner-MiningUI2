import { type QueryObserverOptions, useQuery } from '@tanstack/vue-query'
import { computed, toValue } from 'vue'
import type { MaybeRef, Ref } from 'vue'
import { api } from '@/api/api'
import type { Optional } from '@/libs/vueQuery'
import { isTaskStateRunning } from '@/api/tasks/utils'
import type { TasksRulesResponse } from '@/api/tasks/types'

export function useTaskRulesQuery(taskId: MaybeRef<Optional<number>>, {
  signal,
  refetchInterval,
}: {
  signal?: Ref<AbortSignal>
  refetchInterval?: QueryObserverOptions<TasksRulesResponse>['refetchInterval']
} = {}) {
  const { data, ...query } = useQuery({
    enabled: computed(() => Boolean(toValue(taskId))),
    queryFn: () => api.tasks.rules(toValue(taskId)!, { signal: toValue(signal) }),
    queryKey: ['taskRules', taskId],
    refetchInterval,
  })

  const task = computed(() => data.value?.task)
  const rules = computed(() => data.value?.rules ?? [])
  const state = computed(() => task.value?.state)

  const isNoRulesDiscovered = computed(() => {
    if (!task.value) return false
    if (isTaskStateRunning(task.value.state)) return false

    return !!rules.value.length
  })

  return {
    ...query,
    rules,
    task,
    state,
    isNoRulesDiscovered,
  }
}
