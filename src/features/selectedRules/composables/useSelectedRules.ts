import { useMutation } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useSelectedRulesStoreRefs } from '@selectedRules/stores/selectedRulesStore'
import type { TaskRule } from '@/api/tasks/types'
import { api } from '@/api/api'
import { useActiveRuleSetRulesQuery } from '@/api/ruleSets/useRuleSetRulesQuery'

export function useSelectedRules() {
  const activeRuleSetRulesQuery = useActiveRuleSetRulesQuery()
  const { activeRuleSetId } = activeRuleSetRulesQuery

  const ruleSetRulesIdsSet = computed(() => {
    return new Set(activeRuleSetRulesQuery.rules.value.map(rule => rule.id))
  })

  function isRuleSelected(rule: TaskRule) {
    return ruleSetRulesIdsSet.value.has(rule.id)
  }

  const addRulesMutation = useMutation({
    mutationFn: api.ruleSets.addRules,
  })
  const removeRulesMutation = useMutation({
    mutationFn: api.ruleSets.removeRules,
  })

  async function addRules(rules: TaskRule | TaskRule[]) {
    if (!activeRuleSetId.value) return
    if (!Array.isArray(rules)) rules = [rules]

    await addRulesMutation.mutateAsync({
      id: activeRuleSetId.value,
      rules: rules.map(rule => rule.id),
    })
  }

  async function removeRules(rules: TaskRule | TaskRule[]) {
    if (!activeRuleSetId.value) return
    if (!Array.isArray(rules)) rules = [rules]

    await removeRulesMutation.mutateAsync({
      id: activeRuleSetId.value,
      rules: rules.map(rule => rule.id),
    })
  }

  function toggle(task: TaskRule) {
    if (isRuleSelected(task)) {
      return removeRules(task)
    }

    return addRules(task)
  }

  const removedRules = computed(() => {
    return removeRulesMutation.variables.value?.rules ?? []
  })

  const addedRules = computed(() => {
    return addRulesMutation.variables.value?.rules ?? []
  })

  function isRuleBeingRemoved(rule: TaskRule) {
    return removedRules.value.includes(rule.id)
  }

  function isRuleBeingAdded(rule: TaskRule) {
    return addedRules.value.includes(rule.id)
  }

  function wasRuleAdded(rule: TaskRule) {
    return addRulesMutation.isSuccess.value && isRuleBeingAdded(rule)
  }

  function wasRuleRemoved(rule: TaskRule) {
    return removeRulesMutation.isSuccess.value && isRuleBeingRemoved(rule)
  }

  function isRuleSelectionLoading(rule: TaskRule) {
    const isRemoveLoading = removeRulesMutation.isPending.value && isRuleBeingRemoved(rule)
    const isAddLoading = addRulesMutation.isPending.value && isRuleBeingAdded(rule)

    return isRemoveLoading || isAddLoading
  }

  return {
    addRulesMutation,
    removeRulesMutation,
    addRules,
    removeRules,
    toggle,
    isRuleSelected,
    isRuleSelectionLoading,
    isRuleBeingAdded,
    isRuleBeingRemoved,
    wasRuleAdded,
    wasRuleRemoved,
    addedRules,
    removedRules,
  }
}
