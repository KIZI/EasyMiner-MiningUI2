import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { api } from '@/api/api'
import { queryKeys } from '@/api/queryKeys'

export function useRuleSetsQuery() {
  const query = useQuery({
    queryFn: () => api.ruleSets.list(),
    queryKey: queryKeys.ruleSets.list(),
  })

  const ruleSets = computed(() => query.data.value ?? [])

  return {
    ...query,
    ruleSets,
  }
}
