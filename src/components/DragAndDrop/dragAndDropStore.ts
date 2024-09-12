import { defineStore } from 'pinia'
import type { ValueOf } from 'type-fest'
import { computed, ref } from 'vue'
import { createEventHook, useEventBus } from '@vueuse/core'
import type { DragEndFlags, Draggable } from '@/components/DragAndDrop/useDraggable'

export const useDragAndDropStore = defineStore('dragAndDrop', () => {
  const draggedItem = ref<DraggedItem | null>()
  const dropItemEventHook = createEventHook()

  const isActive = computed(() => !!draggedItem.value)

  function setDraggedItem(item: DraggedItem) {
    draggedItem.value = item
  }

  function dropItem(flags: DragEndFlags = {}) {
    if (!draggedItem.value) return
    if (flags.cancelled) return

    dropItemEventHook.trigger()
    clearDraggedItem()
  }

  function clearDraggedItem() {
    draggedItem.value = null
  }

  return {
    isActive,
    draggedItem,
    dropItem,
    setDraggedItem,
    dropItemEventHook,
  }
})

export type DraggedItem<TPayload = any> = {
  source: DragSource
  payload: TPayload
  draggable: Draggable
}

export const DragSources = {
  antecedent: 'antecedent',
  consequent: 'consequent',
  metasource: 'metasource',
  datasource: 'datasource',
} as const
export type DragSource = ValueOf<typeof DragSources>
