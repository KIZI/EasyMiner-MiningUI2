import { storeToRefs } from 'pinia'
import { useTaskStateQuery } from '@/api/tasks/useTaskStateQuery'
import { useTasksStore } from '@/stores/tasksStore'

export function useActiveTaskStateQuery() {
  const { activeTaskId } = storeToRefs(useTasksStore())
  return useTaskStateQuery(activeTaskId)
}
