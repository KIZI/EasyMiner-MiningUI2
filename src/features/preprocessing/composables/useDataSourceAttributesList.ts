import { createSharedComposable } from '@vueuse/core'
import { computed } from 'vue'
import { useActiveDatasourceQuery } from '@/api/datasources/useActiveDatasourceQuery'
import { type ListAttribute, useAttributesList } from '@/components/Attributes/useAttributesList'

export const useDataSourceAttributesList = createSharedComposable(() => {
  const datasourceQuery = useActiveDatasourceQuery()

  const attributes = computed(() => {
    const columns = datasourceQuery.data.value?.column
    if (!columns) return []

    return columns.map((column) => {
      return {
        ...column,
        isAvailable: true,
        source: 'datasource',
      } as const
    })
  })

  const attributesList = useAttributesList({
    attributes,
    dragSource: 'datasource',
    isLoading: datasourceQuery.isPending,
  })

  return {
    attributesList,
  }
})
