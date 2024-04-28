import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useMinerQuery } from '@/api/miners/useMinerQuery'

export const useSelectedRulesStore = defineStore('selectedRules', () => {
  const { ruleSetId } = useMinerQuery()

  const currentRuleSetId = ref<number>()

  watch(ruleSetId, (id) => {
    currentRuleSetId.value = id
  }, { immediate: true })

  function setCurrentRuleSetId(id: number) {
    currentRuleSetId.value = id
  }

  return {
    setCurrentRuleSetId,
    currentRuleSetId,
  }
})

export const useSelectedRulesStoreRefs = () => storeToRefs(useSelectedRulesStore())
