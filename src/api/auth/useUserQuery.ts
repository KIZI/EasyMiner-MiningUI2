import { useQuery } from '@tanstack/vue-query'
import { api } from '@/api/api'
import { queryKeys } from '@/api/queryKeys'

export function useUserQuery() {
  return useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: () => api.auth.user(),
  })
}
