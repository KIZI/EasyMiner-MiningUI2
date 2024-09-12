import type { MaybeRef, Ref } from 'vue'
import { computed, reactive, ref, toValue, watch } from 'vue'
import { looseIndexOf } from '@vue/shared'

type UseSelectionOptions<T> = {
  items?: MaybeRef<T[]>
  selection?: Ref<T[]>
  itemIdentity?: (item: T) => T | string | number
}

export function useSelectionModel<T>(options: UseSelectionOptions<T>) {
  const selection = options.selection ?? ref([])

  const isAnySelected = computed(() => selection.value.length > 0)

  function selectAll() {
    selection.value = toValue(options.items) ?? []
  }

  function clear() {
    selection.value = []
  }

  function invert() {
    const invertedSelection: T[] = []
    for (const item of toValue(options.items) ?? []) {
      if (!isItemSelected(item)) {
        invertedSelection.push(item)
      }
    }
    selection.value = invertedSelection
  }

  function getItemIndex(item: T) {
    return looseIndexOf(selection.value, item)
  }

  function isItemSelected(item: T) {
    return getItemIndex(item) > -1
  }

  function addItem(item: T) {
    if (isItemSelected(item)) return
    selection.value.push(item)
  }

  function removeItem(item: T) {
    const index = getItemIndex(item)
    if (index === -1) return
    selection.value.splice(index, 1)
  }

  function toggleItem(item: T) {
    if (isItemSelected(item)) {
      removeItem(item)
    }
    else {
      addItem(item)
    }
  }

  function getClone() {
    return [...selection.value]
  }

  return reactive({
    selection,
    isAnySelected,
    selectAll,
    clear,
    invert,
    isItemSelected,
    toggleItem,
    addItem,
    removeItem,
    getClone,
  })
}
