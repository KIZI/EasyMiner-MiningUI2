import { type UseQueryOptions, keepPreviousData, useQuery, useQueryClient } from '@tanstack/vue-query'
import { type MaybeRef, computed, toValue } from 'vue'
import { useSelectedRulesStore, useSelectedRulesStoreRefs } from '@selectedRules/stores/selectedRulesStore'
import { api } from '@/api/api'
import { queryKeys } from '@/api/queryKeys'
import type { Optional } from '@/libs/vueQuery'
import { type PaginationInput, getPaginationParams } from '@/components/Pagination/usePagination'
import type { RuleSetRulesInput, RuleSetsRulesResponse } from '@/api/ruleSets/types'
import { cleanParams } from '@/api/utils'

export type RuleSetsRulesQueryOptions = {
  pagination?: PaginationInput
  order?: {
    orderBy?: RuleSetRulesInput['orderby']
    order?: RuleSetRulesInput['order']
  }
  filters?: {
    antecedent?: string
    consequent?: string
  }
}

export type RuleSetsRulesQueryParams = {
  options?: MaybeRef<RuleSetsRulesQueryOptions>
  queryOptions?: Partial<UseQueryOptions<RuleSetsRulesResponse>>
}

export function useRuleSetRulesQuery(id: MaybeRef<Optional<number>>, params: RuleSetsRulesQueryParams = {}) {
  const query = useQuery({
    queryKey: [...queryKeys.ruleSets.rules(id), params.options].filter(Boolean),
    enabled: computed(() => Boolean(toValue(id))),
    queryFn: () => {
      const {
        pagination,
        order,
        filters,
      } = toValue(params.options) ?? {}

      return api.ruleSets.rules({
        id: toValue(id)!,
        ...pagination && getPaginationParams(pagination),
        ...cleanParams({
          order: order?.order,
          orderby: order?.orderBy,
          searchAntecedent: filters?.antecedent,
          searchConsequent: filters?.consequent,
        }),
      })
    },
    ...params.queryOptions,
  })

  const rulesCount = computed(() => query.data.value?.rulesCount)
  const ruleSet = computed(() => query.data.value?.ruleset)
  const rules = computed(() => query.data.value?.rules ?? [])

  return {
    ...query,
    ruleSet,
    rules,
    rulesCount,
  }
}

export function useActiveRuleSetRulesQuery(params: RuleSetsRulesQueryParams = {}) {
  const { activeRuleSetId } = useSelectedRulesStoreRefs()
  const query = useRuleSetRulesQuery(activeRuleSetId, params)

  return {
    ...query,
    activeRuleSetId,
  }
}
