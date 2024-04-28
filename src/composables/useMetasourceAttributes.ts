import { computed } from 'vue'
import { useActiveMetasourceQuery } from '@/api/metasources/useActiveMetasourceQuery'
import { useRulePatternStore } from '@/features/rulesMining/stores/rulePatternStore'

export function useMetasourceAttributes() {
  const { attributes: metasourceAttributes, isPending } = useActiveMetasourceQuery()
  const rulePatternStore = useRulePatternStore()

  const attributes = computed(() => metasourceAttributes.value.map(attribute => ({
    ...attribute,
    isAvailable: !rulePatternStore.hasItem(attribute.id),
  })))

  function getById(id: number) {
    return attributes.value.find(attribute => attribute.id === id)
  }

  return {
    attributes,
    getById,
    isPending,
  }
}
