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

  const unusedAttributes = computed(() => {
    return attributes.value.filter(attribute => attribute.isAvailable)
  })

  function getById(id: number) {
    return attributes.value.find(attribute => attribute.id === id)
  }

  return {
    attributes,
    unusedAttributes,
    getById,
    isPending,
  }
}
