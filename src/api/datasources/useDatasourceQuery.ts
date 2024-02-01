import { useQuery } from '@tanstack/vue-query';
import { toValue, type MaybeRef } from '@vueuse/core';
import { computed } from 'vue';
import type { Optional } from '../../libs/vueQuery';
import { queryKeys } from '@/api/queryKeys';
import { api } from '@/api/api';

export function useDatasourceQuery(id: MaybeRef<Optional<number>>) {
  return useQuery({
    enabled: computed(() => Boolean(toValue(id))),
    queryFn: () => api.datasources.detail(toValue(id)!),
    queryKey: queryKeys.datasources.detail(id),
  });
}
