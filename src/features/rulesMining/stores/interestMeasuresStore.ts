import { InterestMeasures } from '@rulesMining/types/interestMeasure.types'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import type { InterestMeasure, InterestMeasureActiveItem } from '@rulesMining/types/interestMeasure.types'
import { useRulePatternStore } from '@rulesMining/stores/rulePatternStore'
import { appConfig } from '@/config/appConfig'

const interestMeasuresOptionsByName = appConfig.interestMeasures
const interestMeasuresOptions = Object.values(appConfig.interestMeasures)

const defaultMeasuresOptions = interestMeasuresOptions
  .filter(item => item.hasInitialValue)
  .map(item => [item.name, Number(item.defaultValue)] as const)

export const useInterestMeasuresStore = defineStore('interestMeasures', () => {
  const rulePatternStore = useRulePatternStore()

  const pruning = ref(false)
  const rulesLimit = ref(1000)

  const isPruningAvailable = computed(() => {
    const isConsequentSingle = rulePatternStore.consequent.length === 1
    const hasAttributeAnyValue = !rulePatternStore.consequent[0]?.fixedValue

    return isConsequentSingle && hasAttributeAnyValue
  })

  const isPruningEnabled = computed(() => {
    return isPruningAvailable.value && pruning.value
  })

  const autoConfAndSupp = ref(false)

  const measuresMap = ref(new Map<InterestMeasure, number>(defaultMeasuresOptions))

  const activeMeasures = computed<InterestMeasureActiveItem[]>(() => {
    return [...measuresMap.value.keys()].map(measure => getMeasure(measure))
  })

  const availableMeasures = computed(() => {
    if (measuresMap.value.has(InterestMeasures.AutoConfSupp)) return []

    return interestMeasuresOptions.filter((item) => {
      if (item.name === InterestMeasures.AutoConfSupp) return !activeMeasures.value.length
      return !measuresMap.value.has(item.name)
    })
  })

  const canAddMeasure = computed(() => !autoConfAndSupp.value)

  function getMeasure(name: InterestMeasure) {
    return {
      ...interestMeasuresOptionsByName[name],
      value: measuresMap.value.get(name),
    } as InterestMeasureActiveItem
  }

  function setMeasure(name: InterestMeasure, value: number) {
    measuresMap.value.set(name, value)
  }

  function removeMeasure(name: InterestMeasure) {
    measuresMap.value.delete(name)
  }

  function removeAll() {
    measuresMap.value.clear()
    autoConfAndSupp.value = false
    pruning.value = false
  }

  const isFormActive = ref(false)
  const editedMeasure = ref<InterestMeasure | null>(null)

  function openForm(name: InterestMeasure) {
    editedMeasure.value = name
    isFormActive.value = true
  }

  function closeForm() {
    editedMeasure.value = null
    isFormActive.value = false
  }

  return {
    activeMeasures,
    availableMeasures,
    canAddMeasure,
    isFormActive,
    editedMeasure,
    pruning,
    isPruningAvailable,
    isPruningEnabled,
    rulesLimit,
    getMeasure,
    setMeasure,
    removeMeasure,
    removeAll,
    closeForm,
    openForm,
  }
})

export const useInterestMeasuresStoreRefs = () => storeToRefs(useInterestMeasuresStore())
