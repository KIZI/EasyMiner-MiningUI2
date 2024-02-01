<template>
  <slot
    :events="attribute.isAvailable ? draggable.events : {}"
    :is-dragged="draggable.isDragged"
  />
</template>

<script setup lang="ts">
import { useDraggable, type Draggable } from '@/components/DragAndDrop/useDraggable';
import { useDragAndDropStore } from '@/components/DragAndDrop/dragAndDropStore';
import type { ListAttribute } from '@/components/Attributes/useAttributesList';

const props = defineProps<{
  attribute: ListAttribute,
}>();

const dragAndDropStore = useDragAndDropStore();
const draggable = useDraggable({
  onDragEnd,
  onDragStart,
  payload: props.attribute,
});

const emit = defineEmits<{(e: 'dragStart', draggable: Draggable): void,
  (e: 'dragEnd'): void,
}>();

async function onDragStart(draggable: Draggable) {
  emit('dragStart', draggable);
}
function onDragEnd() {
  dragAndDropStore.dropItem();
  emit('dragEnd');
}
</script>
