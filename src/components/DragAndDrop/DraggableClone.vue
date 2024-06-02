<template>
  <div
    ref="sourceRef"
    :class="{
      'opacity-50': draggable.isDragged,
    }"
    v-on="draggable.events"
  >
    <slot />

    <Teleport to="body">
      <div
        v-if="draggable.isDragged"
        ref="draggableRef"
        class="absolute z-50"
        :style="{
          left: `${originalPosition.x}px`,
          top: `${originalPosition.y}px`,
        }"
      >
        <div
          :style="{
            transform: `translate(${delta.x}px, ${delta.y}px)`,
          }"
        >
          <component :is="$slots.default" />
        </div>
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
const originalPosition = ref({ x: 0, y: 0 })

const draggable = useDraggable({
  onDragEnd: dragAndDropStore.dropItem,
  onDragStart,
  payload: props.payload,
})
const dragPosition = toRef(draggable, 'dragPosition')
const delta = computed(() => {
  const x = dragPosition.value.x - originalPosition.value.x
  const y = dragPosition.value.y - originalPosition.value.y
  return { x, y }
})

async function onDragStart() {
  await nextTick()
  if (!draggableRef.value || !sourceRef.value) return

  const { left, top } = sourceRef.value.getBoundingClientRect()

  originalPosition.value = {
    x: left,
    y: top,
  }

  dragAndDropStore.setDraggedItem({
    elementRef: draggableRef.value,
    payload: props.payload,
    position: dragPosition,
    source: props.source,
  })
}
</script>
