import { storeToRefs } from 'pinia';
import { useTaskRulesQuery } from '@/api/tasks/useTaskRulesQuery';
import { useTasksStore } from '@/stores/tasksStore';

export function useActiveTaskRulesQuery() {
  const { activeTaskId } = storeToRefs(useTasksStore());
  return useTaskRulesQuery(activeTaskId);
}
