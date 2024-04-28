import { storeToRefs } from 'pinia'
import { useTaskDetailQuery } from '@/api/tasks/useTaskDetailQuery'
import { useTasksStore } from '@/stores/tasksStore'

export function useActiveTaskDetailQuery() {
  const { activeTaskId } = storeToRefs(useTasksStore())
  return useTaskDetailQuery(activeTaskId)
}
