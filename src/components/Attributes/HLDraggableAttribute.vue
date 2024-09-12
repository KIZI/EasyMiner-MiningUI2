<template>
  <slot
    :events="attribute.isAvailable ? draggable.events : {}"
    :is-dragged="draggable.isDragged"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type DragEndFlags, type Draggable, useDraggable } from '@/components/DragAndDrop/useDraggable'
import { useDragAndDropStore } from '@/components/DragAndDrop/dragAndDropStore'
import type { ListAttribute } from '@/components/Attributes/useAttributesList'

const props = defineProps<{
  attribute: ListAttribute
}>()

const emit = defineEmits<{
  dragStart: [draggable: Draggable]
  dragEnd: []
}>()
const dragAndDropStore = useDragAndDropStore()
const draggable = useDraggable({
  onDragEnd,
  onDragStart,
  payload: computed(() => props.attribute),
})

async function onDragStart() {
  emit('dragStart', draggable)
}
function onDragEnd(flags: DragEndFlags) {
  dragAndDropStore.dropItem(flags)
  emit('dragEnd')
}
</script>
