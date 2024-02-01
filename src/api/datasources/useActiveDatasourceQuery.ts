import { useDatasourceQuery } from '@/api/datasources/useDatasourceQuery';
import { useActiveMinerQuery } from '@/api/miners/useActiveMinerQuery';

export function useActiveDatasourceQuery() {
  const { datasourceId } = useActiveMinerQuery();
  return useDatasourceQuery(datasourceId);
}
