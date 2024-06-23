import type { MaybeRef, Ref } from 'vue'
import { computed, reactive, ref, toRaw, toValue, watch, watchEffect } from 'vue'

type UseSelectionOptions<T> = {
  items?: MaybeRef<T[]>
  selection?: Ref<T[]>
  itemIdentity?: (item: T) => T | string | number
}

export function useSelectionModel<T>(options: UseSelectionOptions<T>) {
  const selection = options.selection ?? ref([])
  const itemIdentity = options.itemIdentity ?? ((item: T) => item)

  const selectionIdsSet = computed(() => {
    return new Set(selection.value.map(item => itemIdentity(toRaw(item))))
  })

  const availableItems = computed(() => [...toValue(options.items) ?? []])
  const availableItemdsIdsSet = computed(() => {
    return new Set(availableItems.value.map(item => itemIdentity(item)))
  })

  watch(availableItems, () => {
    selection.value = selection.value.filter((item) => {
      if (!availableItemdsIdsSet.value.size) return false
      return availableItemdsIdsSet.value.has(itemIdentity(item))
    })
  })

  const isAnySelected = computed(() => {
    return Boolean(selection.value.length)
  })

  function selectAll() {
    if (!availableItems.value) return
    selection.value = availableItems.value
  }

  function clear() {
    selection.value = []
  }

  function invert() {
    if (!availableItems.value) return
    selection.value = availableItems.value.filter(item => !isItemSelected(item))
  }

  function isItemSelected(item: T) {
    return selectionIdsSet.value.has(itemIdentity(item))
  }

  function toggleItem(item: T) {
    if (isItemSelected(item)) {
      const index = selection.value.findIndex(i => itemIdentity(i) === itemIdentity(item))
      selection.value.splice(index, 1)
    }
    else {
      selection.value.push(item)
    }
  }

  return reactive({
    selection,
    isAnySelected,
    selectAll,
    clear,
    invert,
    isItemSelected,
    toggleItem,
  })
}
