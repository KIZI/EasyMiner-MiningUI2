import type { MaybeRef, Ref } from 'vue'
import { computed, ref, toValue } from 'vue'

type UseSelectionOptions<T> = {
  items: MaybeRef<T[]>
  modelValue?: Ref<T[]>
}

export function useSelectionModel<T>(options: UseSelectionOptions<T>) {
  options.modelValue ??= ref([])
  const { modelValue } = options

  const items = computed(() => {
    return toValue(options.items)
  })

  const hasItems = computed(() => {
    return Boolean(modelValue.value.length)
  })

  function selectAll() {
    modelValue.value = items.value
  }

  function clearSelection() {
    modelValue.value = []
  }

  function invertSelection() {
    modelValue.value = items.value.filter(item => !modelValue.value.includes(item))
  }

  function isItemSelected(item: T) {
    return modelValue.value.includes(item)
  }

  function toggleItem(item: T) {
    if (isItemSelected(item)) {
      const index = modelValue.value.indexOf(item)
      modelValue.value.splice(index, 1)
    }
    else {
      modelValue.value.push(item)
    }
  }

  return {
    modelValue,
    selectAll,
    clearSelection,
    invertSelection,
    isItemSelected,
    toggleItem,
    hasItems,
  }
}
