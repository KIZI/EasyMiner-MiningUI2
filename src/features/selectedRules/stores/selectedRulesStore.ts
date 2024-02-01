import { defineStore, storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useActiveMinerQuery } from '@/api/miners/useActiveMinerQuery';

export const useSelectedRulesStore = defineStore('selectedRules', () => {
  const { ruleSetId } = useActiveMinerQuery();

  const currentRuleSetId = ref<number>();

  watch(ruleSetId, (id) => {
    currentRuleSetId.value = id;
  });

  function setCurrentRuleSetId(id: number) {
    currentRuleSetId.value = id;
  }

  return {
    setCurrentRuleSetId,
    currentRuleSetId,
  };
});

export const useSelectedRulesStoreRefs = () => storeToRefs(useSelectedRulesStore());
