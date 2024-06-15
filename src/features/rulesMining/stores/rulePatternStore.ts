import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { sortBy } from 'lodash-es'
import { useInterestMeasuresStore } from '@rulesMining/stores/interestMeasuresStore'
import { type InterestMeasure, SpecialInterestMeasures } from '@rulesMining/types/interestMeasure.types'
import type { Cedent, CedentItem } from '@/features/rulesMining/types/rulePattern.types'
import { CEDENT } from '@/features/rulesMining/types/rulePattern.types'
import { patternItemToAttributeSimpleInput } from '@/features/rulesMining/utils/rulesMining'
import type { MetasourceAttribute } from '@/api/metasources/types'
import { useActiveMetasourceQuery } from '@/api/metasources/useActiveMetasourceQuery'
import type { TaskCedent, TaskSettingsRule } from '@/api/tasks/types'

export const useRulePatternStore = defineStore('rulePattern', () => {
  const activeMetasourceQuery = useActiveMetasourceQuery()
  const interestMeasuresStore = useInterestMeasuresStore()

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

  function setItemCedent(id: number, cedent: Cedent) {
    const item = itemsMap.value.get(id)
    if (!item) return
    item.cedent = cedent
  }

  function setItemOptions({ id, fixedValue }: { id: number, fixedValue: string }) {
    const item = itemsMap.value.get(id)
    if (!item) return
    item.fixedValue = fixedValue
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

    interestMeasuresStore.removeAll()
    for (const iM of iMs) {
      const threshold = typeof iM.threshold === 'string' ? Number.parseFloat(iM.threshold) : iM.threshold
      interestMeasuresStore.setMeasure(iM.name as InterestMeasure, threshold)
    }
    const isPruned = specialIMs.some(iM => iM.name === SpecialInterestMeasures.CBA)
    interestMeasuresStore.pruning = isPruned
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
    clearItems,
    loadTaskRule,
    setItemOptions,
    setItemCedent,
  }
})

setTimeout(() => {
  const store = useRulePatternStore()
  const imStore = useInterestMeasuresStore()
  store.addItemById(29421, 'Antecedent')
  store.addItemById(29417, 'Consequent')
  imStore.setMeasure('CONF', 0.05)
  imStore.setMeasure('SUPP', 0.06)
}, 1000)
