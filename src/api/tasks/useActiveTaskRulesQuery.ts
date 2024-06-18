import { storeToRefs } from 'pinia'
import { type TaskRulesQueryParams, useTaskRulesQuery } from '@/api/tasks/useTaskRulesQuery'
import { useTasksStore } from '@/stores/tasksStore'

export function useActiveTaskRulesQuery(params: TaskRulesQueryParams = {}) {
  const { activeTaskId } = storeToRefs(useTasksStore())
  return useTaskRulesQuery(activeTaskId, params)
}
