import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useMinerQuery } from '@/api/miners/useMinerQuery'
import { api } from '@/api/api'
import { queryKeys } from '@/api/queryKeys'

export function useActiveMetasourceQuery() {
  const minerQuery = useMinerQuery()

  const query = useQuery({
    queryKey: queryKeys.metasources.active(),
    queryFn: () => api.metasources.detail(minerQuery.metasourceId.value!),
    enabled: minerQuery.isSuccess,
  })

  const attributes = computed(() => query.data.value?.attribute ?? [])

  function getAttributeById(id: number) {
    return attributes.value.find(attribute => attribute.id === id)
  }

  return {
    ...query,
    attributes,
    getAttributeById,
  }
}
