<template>
  <Teleport to="body">
    <div
      v-if="draggable"
      class="absolute z-50 grid"
      :style="{
        left: `${draggable.dragPosition.x - 4}px`,
        top: `${draggable.dragPosition.y - 4}px`,
      }"
    >
      <div
        v-for="(attribute, i) in draggedAttributes"
        :key="attribute.id"
        :ref="retrieveFirstItemRef(i)"
        class="relative col-start-1 row-start-1 rounded border border-white bg-primary-200 px-3 py-1.5 text-sm font-medium text-gray-800"
        :style="{
          zIndex: 50 + draggedAttributes.length - i,
          left: `${i * 0.5}rem`,
          top: `${i * 1.8}rem`,
        }"
      >
        <Truncate
          :length="appConfig.truncateLength.attribute"
          :text="attribute.name"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  ref,
  toRef,
  watch,
} from 'vue'
import { useDragAndDropStore } from '@/components/DragAndDrop/dragAndDropStore'
import { useInjectAttributesList } from '@/components/Attributes/attributesListInjection'
import type { Draggable } from '@/components/DragAndDrop/useDraggable'
import Truncate from '@/components/Truncate.vue'
import { appConfig } from '@/config/appConfig'

const props = defineProps<{
  draggable?: Draggable
}>()

const attributeList = useInjectAttributesList()!

const dragAndDropStore = useDragAndDropStore()

const draggedAttributes = computed(() => {
  if (!props.draggable) return []

  if (attributeList.selection.hasItems.value) {
    if (attributeList.selection.isItemSelected(props.draggable.payload)) {
      return attributeList.selection.modelValue.value
    }
  }

  return [props.draggable.payload]
})

const draggedItemRef = ref<HTMLElement>()

watch(() => props.draggable, async (draggable) => {
  await nextTick()
  if (!draggable || !draggedItemRef.value || !attributeList.dragSource) return

  dragAndDropStore.setDraggedItem({
    elementRef: draggedItemRef.value,
    payload: draggedAttributes.value,
    position: toRef(draggable, 'dragPosition'),
    source: attributeList.dragSource,
  })
})

function retrieveFirstItemRef(i: number) {
  if (i > 0) return

  return (el: HTMLElement) => {
    draggedItemRef.value = el
  }
}
</script>
