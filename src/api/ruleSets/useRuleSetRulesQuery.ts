import { useQuery } from '@tanstack/vue-query'
import { type MaybeRef, computed, toValue } from 'vue'
import { api } from '@/api/api'
import { queryKeys } from '@/api/queryKeys'
import type { Optional } from '@/libs/vueQuery'

export function useRuleSetRulesQuery(id: MaybeRef<Optional<number>>) {
  const query = useQuery({
    enabled: computed(() => Boolean(toValue(id))),
    queryFn: () => api.ruleSets.rules(toValue(id)!),
    queryKey: queryKeys.ruleSets.rules(id),
    keepPreviousData: true,
  })

  const ruleSet = computed(() => query.data.value?.ruleset)
  const rules = computed(() => query.data.value?.rule ?? [])

  return {
    ...query,
    ruleSet,
    rules,
  }
}
