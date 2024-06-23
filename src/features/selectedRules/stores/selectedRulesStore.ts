import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useMinerQuery } from '@/api/miners/useMinerQuery'
import { useRuleSetsQuery } from '@/api/ruleSets/useRuleSetsQuery'

export const useSelectedRulesStore = defineStore('selectedRules', () => {
  const { ruleSetId } = useMinerQuery()
  const ruleSetsQuery = useRuleSetsQuery()

  const activeRuleSetId = ref<number>()

  watch(ruleSetId, (id) => {
    activeRuleSetId.value = id
  }, { immediate: true })

  const activeRuleSet = computed(() => {
    return ruleSetsQuery.data.value?.find(ruleSet => ruleSet.id === activeRuleSetId.value)
  })

  function setActiveRuleSetId(id: number) {
    activeRuleSetId.value = id
  }

  return {
    activeRuleSet,
    setActiveRuleSetId,
    activeRuleSetId,
  }
})

export const useSelectedRulesStoreRefs = () => storeToRefs(useSelectedRulesStore())
