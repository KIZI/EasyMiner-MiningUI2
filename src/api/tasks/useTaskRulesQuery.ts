import { useQuery } from '@tanstack/vue-query'
import { computed, toValue } from 'vue'
import type { MaybeRef } from 'vue'
import { useTaskStateQuery } from '@/api/tasks/useTaskStateQuery'
import { api } from '@/api/api'
import type { Optional } from '@/libs/vueQuery'
import { isTaskStateRunning } from '@/api/tasks/utils'

export function useTaskRulesQuery(taskId: MaybeRef<Optional<number>>) {
  const { state } = useTaskStateQuery(taskId)

  const { data, ...query } = useQuery({
    enabled: computed(() => Boolean(toValue(taskId)) && state.value === 'solved'),
    queryFn: () => api.tasks.rules(toValue(taskId)!),
    queryKey: ['taskRules', taskId],
  })

  const task = computed(() => data.value?.task)
  const rules = computed(() => data.value?.rules ?? [])

  const isNoRulesDiscovered = computed(() => {
    if (!state.value) return false
    if (isTaskStateRunning(state.value)) return false

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
