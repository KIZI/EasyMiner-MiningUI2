<template>
  <slot
    :events="draggable.events"
    :is-dragged="draggable.isDragged"
  />
</template>

<script setup lang="ts">
import { useDraggable } from '@/components/DragAndDrop/useDraggable';

const props = defineProps<{
  payload: unknown,
}>();

const emit = defineEmits(['start', 'end']);

const draggable = useDraggable({
  onDragEnd: () => emit('end'),
  onDragStart: () => emit('start'),
  payload: props.payload,
});
</script>
