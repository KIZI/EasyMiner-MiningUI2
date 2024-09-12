import { computed } from 'vue'
import { useRulePatternStore } from '@rulesMining/stores/rulePatternStore'
import { useActiveMetasourceQuery } from '@/api/metasources/useActiveMetasourceQuery'

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
