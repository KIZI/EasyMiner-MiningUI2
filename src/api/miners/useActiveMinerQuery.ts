import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { queryKeys } from '@/api/queryKeys';
import { api } from '@/api/api';

export function useActiveMinerQuery() {
  const activeMinerId = 3359;

  const query = useQuery({
    queryFn: () => api.miners.detail(activeMinerId),
    queryKey: queryKeys.miner.active(),
  });

  const minerId = computed(() => query.data.value?.id);
  const metasourceId = computed(() => query.data.value?.metasourceId);
  const datasourceId = computed(() => query.data.value?.datasourceId);
  const ruleSetId = computed(() => query.data.value?.ruleSetId);

  return {
    ...query,
    datasourceId,
    metasourceId,
    minerId,
    ruleSetId,
  };
}
