import { useQuery } from '@tanstack/vue-query';
import { computed, toValue, type MaybeRef } from 'vue';
import { api } from '@/api/api';

export function useTaskDetailQuery(id: MaybeRef<number | undefined>) {
  const query = useQuery({
    enabled: computed(() => Boolean(toValue(id))),
    queryFn: () => api.tasks.detail(toValue(id)!),
    queryKey: ['tasksDetail', id],
  });

  return {
    ...query,
    task: query.data,
  };
}
