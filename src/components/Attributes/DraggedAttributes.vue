<template>
  <Teleport to="body">
    <div v-if="draggable" class="absolute z-50 grid" :style="draggable.draggedElementStyle">
      <div
        v-for="(attribute, i) in visualisedDraggedAttributes" :key="attribute.id" :ref="retrieveFirstItemRef(i)"
        class="relative col-start-1 row-start-1 rounded border px-3 py-1.5 text-sm font-medium text-gray-800"
        :class="[i === 5 ? 'border-primary-400 bg-white' : 'border-white bg-primary-200']" :style="{
          zIndex: 50 + draggedAttributes.length - i,
          left: `${i * 0.5}rem`,
          top: `${i * 1.8}rem`,
        }"
      >
        <Truncate :length="appConfig.truncateLength.attribute" :text="attribute.name" />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  ref,
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
const { selectionModel } = attributeList

const dragAndDropStore = useDragAndDropStore()

const draggedAttributes = computed(() => {
  if (!props.draggable) return []

  if (selectionModel.isItemSelected(props.draggable.payload)) {
    return selectionModel.getClone()
  }

  return [props.draggable.payload]
})

const visualisedDraggedAttributes = computed(() => {
  if (draggedAttributes.value.length < 2) return draggedAttributes.value

  const visualizedElements = draggedAttributes.value.slice(0, 5) as {
    id: number
    name: string
  }[]

  if (visualizedElements.length < selectionModel.selection.length) {
    visualizedElements.push({
      id: 0,
      name: `+${selectionModel.selection.length - 5}`,
    })
  }

  return visualizedElements
})

const draggedItemRef = ref<HTMLElement>()

watch(() => props.draggable, async (draggable) => {
  await nextTick()
  if (!draggable || !draggedItemRef.value || !attributeList.dragSource) return

  dragAndDropStore.setDraggedItem({
    draggable,
    payload: draggedAttributes.value,
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
