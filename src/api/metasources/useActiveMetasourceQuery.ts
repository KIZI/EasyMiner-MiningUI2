import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { useActiveMinerQuery } from '@/api/miners/useActiveMinerQuery';
import { api } from '@/api/api';

export function useActiveMetasourceQuery() {
  const minerQuery = useActiveMinerQuery();

  const query = useQuery({
    queryKey: ['activeMetasource'],
    queryFn: () => api.metasources.detail(minerQuery.metasourceId.value!),
    enabled: minerQuery.isSuccess,
  });

  const attributes = computed(() => query.data.value?.attribute ?? []);

  function getAttributeById(id: number) {
    return attributes.value.find((attribute) => attribute.id === id);
  }

  return {
    ...query,
    attributes,
    getAttributeById,
  };
}
