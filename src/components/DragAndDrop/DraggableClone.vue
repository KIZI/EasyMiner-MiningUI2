<template>
  <div
    ref="sourceRef"
    :class="{
      'opacity-50': draggable.isDragged,
    }"
    v-on="draggable.events"
  >
    <slot :is-dragged="draggable.isDragged" />

    <Teleport to="body">
      <div
        v-if="draggable.isDragged"
        ref="draggableRef"
        class="pointer-events-none absolute z-50"
        :style="draggable.draggedElementStyle"
      >
        <component :is="$slots.default" />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, toRef } from 'vue'
import { useDraggable } from '@/components/DragAndDrop/useDraggable'
import type { DragSource } from '@/components/DragAndDrop/dragAndDropStore'
import { useDragAndDropStore } from '@/components/DragAndDrop/dragAndDropStore'

const props = defineProps<{
  payload: any
  source: DragSource
}>()

const dragAndDropStore = useDragAndDropStore()

const sourceRef = ref<HTMLElement>()
const draggableRef = ref<HTMLElement>()

const draggable = useDraggable({
  onDragEnd: dragAndDropStore.dropItem,
  onDragStart,
  payload: props.payload,
})

async function onDragStart() {
  await nextTick()
  if (!draggableRef.value || !sourceRef.value) return

  dragAndDropStore.setDraggedItem({
    draggable,
    payload: props.payload,
    source: props.source,
  })
}
</script>
