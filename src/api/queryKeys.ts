import type { MaybeRef } from '@vueuse/core'
import { useSelectedRulesStoreRefs } from '@selectedRules/stores/selectedRulesStore'
import { computed, reactive } from 'vue'
import type { Optional } from '@/libs/vueQuery'

export const queryKeys = {
  miner: {
    active: () => ['activeMiner'],
    tasks: () => ['minerTasks'],
  },
  ruleSets: {
    list: () => ['ruleSetsList'],
    detail: (id: MaybeRef<Optional<number>>) => ['ruleSets', 'detail', id],
    rules: (id: MaybeRef<Optional<number>>) => ['ruleSets', 'rules', id],
  },
  tasks: {
    rules: (id: MaybeRef<Optional<number>>) => ['task', 'rules', id],
    state: (id: MaybeRef<Optional<number>>) => ['task', 'state', id],
  },
  datasources: {
    detail: (id: MaybeRef<Optional<number>>) => ['datasources', 'detail', id],
  },
  metasources: {
    active: () => ['activeMetasource'],
  },
  auth: {
    user: () => ['user'],
  },
}

export function useQueryKeys() {
  const { activeRuleSetId } = useSelectedRulesStoreRefs()

  const activeRuleSetRules = computed(() => queryKeys.ruleSets.rules(activeRuleSetId))

  return reactive({
    activeRuleSetRules,
  })
}
