import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { sortBy } from 'lodash-es'
import type { Cedent, CedentItem } from '@/features/rulesMining/types/rulePattern.types'
import { CEDENT } from '@/features/rulesMining/types/rulePattern.types'
import { patternItemToAttributeSimpleInput } from '@/features/rulesMining/utils/rulesMining'
import type { MetasourceAttribute } from '@/api/metasources/types'
import { useActiveMetasourceQuery } from '@/api/metasources/useActiveMetasourceQuery'
import type { TaskCedent, TaskSettingsRule } from '@/api/tasks/types'

export const useRulePatternStore = defineStore('rulePattern', () => {
  const activeMetasourceQuery = useActiveMetasourceQuery()

  const itemsMap = ref<Map<MetasourceAttribute['id'], CedentItem>>(new Map())
  const editedItem = ref<CedentItem | null>()

  const items = computed(() => Array.from(itemsMap.value.values()))

  const antecedent = computed(() => getCedentItems(CEDENT.Antecedent))
  const consequent = computed(() => getCedentItems(CEDENT.Consequent))

  const rulePatternInput = computed(() => ({
    antecedent: antecedent.value.map(patternItemToAttributeSimpleInput),
    consequent: consequent.value.map(patternItemToAttributeSimpleInput),
  }))

  function addItem(attribute: MetasourceAttribute, cedent: Cedent) {
    itemsMap.value.set(
      attribute.id,
      {
        ...attribute,
        cedent,
      },
    )
  }

  function addItems(attributes: MetasourceAttribute[], cedent: Cedent) {
    attributes.forEach(attribute => addItem(attribute, cedent))
  }

  function addItemById(id: number, cedent: Cedent) {
    const attribute = activeMetasourceQuery.getAttributeById(id)
    if (!attribute) return

    itemsMap.value.set(
      id,
      {
        ...attribute,
        cedent,
      },
    )
  }

  function hasItem(id: number) {
    return itemsMap.value.has(id)
  }

  function removeItemById(id: number) {
    itemsMap.value.delete(id)
  }

  function getCedentItems(cedent: Cedent) {
    return sortBy(
      items.value.filter(item => item.cedent === cedent),
      attribute => attribute.name.toLowerCase(),
    )
  }

  function openItemOptions(id: number) {
    editedItem.value = itemsMap.value.get(id)
  }

  function closeItemOptions() {
    editedItem.value = null
  }

  function setItemOptions(id: number, {
    fixedValue,
    isNegated = false,
  }: {
    fixedValue?: string
    isNegated?: boolean
  } = {}) {
    const item = itemsMap.value.get(id)
    if (!item) return
    item.fixedValue = fixedValue
    item.isNegated = isNegated
  }

  function clearItems(cedent: Cedent) {
    const targetedCedent = cedent === CEDENT.Antecedent ? antecedent : consequent
    targetedCedent.value.forEach(item => itemsMap.value.delete(item.id))
  }

  function clearCedents() {
    clearItems(CEDENT.Antecedent)
    clearItems(CEDENT.Consequent)
  }

  function loadTaskRule(rule: TaskSettingsRule) {
    const { antecedent, succedent, specialIMs, iMs } = rule

    const loadTaskCedent = (taskCedent: TaskCedent, cedent: Cedent) => {
      const attributes: MetasourceAttribute[] = []

      for (const item of taskCedent.children) {
        const attribute = activeMetasourceQuery.attributes.value.find(attribute => attribute.name === item.name)
        if (attribute) {
          attributes.push(attribute)
        }
      }

      addItems(attributes, cedent)
    }

    clearCedents()
    loadTaskCedent(antecedent, 'Antecedent')
    loadTaskCedent(succedent, 'Consequent')
  }

  return {
    addItem,
    addItemById,
    addItems,
    antecedent,
    closeItemOptions,
    consequent,
    editedItem,
    getCedentItems,
    hasItem,
    itemsMap,
    openItemOptions,
    removeItemById,
    rulePatternInput,
    setItemOptions,
    clearItems,
    loadTaskRule,
  }
})
