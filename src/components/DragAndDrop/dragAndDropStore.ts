import { defineStore } from 'pinia';
import type { MaybeRef } from '@vueuse/core';
import type { ValueOf } from 'type-fest';
import { ref } from 'vue';

export const useDragAndDropStore = defineStore('dragAndDrop', () => {
  const draggedItem = ref<DraggedItem|null>();

  function setDraggedItem(item: DraggedItem) {
    draggedItem.value = item;
  }

  function dropItem() {
    clearDraggedItem();
  }

  function clearDraggedItem() {
    draggedItem.value = null;
  }

  return {
    draggedItem,
    dropItem,
    setDraggedItem,
  };
});

export type DraggedItem<TPayload = any> = {
  elementRef: HTMLElement,
  source: DragSource,
  payload: TPayload,
  position: MaybeRef<{
    x: number,
    y: number,
  }>,
};

export const DRAG_SOURCE = {
  antecedent: 'antecedent',
  consequent: 'consequent',
  metasource: 'metasource',
  datasource: 'datasource',
} as const;
export type DragSource = ValueOf<typeof DRAG_SOURCE>;
