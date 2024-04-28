import { useDatasourceQuery } from '@/api/datasources/useDatasourceQuery'
import { useMinerQuery } from '@/api/miners/useMinerQuery'

export function useActiveDatasourceQuery() {
  const { datasourceId } = useMinerQuery()
  return useDatasourceQuery(datasourceId)
}
