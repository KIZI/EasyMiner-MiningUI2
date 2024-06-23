import { type QueryOptions, type UseQueryOptions, useQuery } from '@tanstack/vue-query'
import { type MaybeRef, computed, toValue } from 'vue'
import { useSelectedRulesStore, useSelectedRulesStoreRefs } from '@selectedRules/stores/selectedRulesStore'
import { api } from '@/api/api'
import { queryKeys } from '@/api/queryKeys'
import type { Optional } from '@/libs/vueQuery'
import type { RuleSet, RuleSetsRulesResponse } from '@/api/ruleSets/types'

export type RuleSetsDetailQueryParams = {
  queryOptions?: Partial<UseQueryOptions<RuleSet>>
}

export function useRuleSetDetailQuery(id: MaybeRef<Optional<number>>, params: RuleSetsDetailQueryParams = {}) {
  const query = useQuery({
    queryKey: [...queryKeys.ruleSets.detail(id)],
    enabled: computed(() => Boolean(toValue(id))),
    queryFn: () => api.ruleSets.detail(toValue(id)!),
    ...params.queryOptions,
  })

  return {
    ...query,
    ruleSet: query.data,
  }
}

export function useActiveRuleSetDetailQuery(params: RuleSetsDetailQueryParams) {
  const { activeRuleSetId } = useSelectedRulesStoreRefs()
  return useRuleSetDetailQuery(activeRuleSetId, params)
}
