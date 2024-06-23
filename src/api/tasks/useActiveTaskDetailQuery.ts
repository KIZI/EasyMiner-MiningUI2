import { storeToRefs } from 'pinia'
import { type TaskDetailQueryParams, useTaskDetailQuery } from '@/api/tasks/useTaskDetailQuery'
import { useTasksStore } from '@/stores/tasksStore'

export function useActiveTaskDetailQuery(params?: TaskDetailQueryParams) {
  const { activeTaskId } = storeToRefs(useTasksStore())
  return useTaskDetailQuery(activeTaskId, params)
}
