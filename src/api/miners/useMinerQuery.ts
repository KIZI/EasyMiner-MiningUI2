import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { queryKeys } from '@/api/queryKeys'
import { api } from '@/api/api'
import { appConfig } from '@/config/appConfig'

declare global {
  interface Window {
    minerId: number
  }
}

export function useMinerQuery() {
  const minerId = appConfig.minerId

  const query = useQuery({
    queryFn: () => api.miners.detail(minerId),
    queryKey: queryKeys.miner.active(),
  })

  const metasourceId = computed(() => query.data.value?.metasourceId)
  const datasourceId = computed(() => query.data.value?.datasourceId)
  const ruleSetId = computed(() => query.data.value?.ruleSetId)

  return {
    ...query,
    datasourceId,
    metasourceId,
    minerId,
    ruleSetId,
  }
}
