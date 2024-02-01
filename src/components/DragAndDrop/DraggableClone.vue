<template>
  <div
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
          left: `${dragPosition.x - 4}px`,
          top: `${dragPosition.y - 4}px`,
        }"
      >
        <component :is="$slots.default" />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, toRef } from 'vue';
import { useDraggable } from '@/components/DragAndDrop/useDraggable';
import type { DragSource } from '@/components/DragAndDrop/dragAndDropStore';
import { useDragAndDropStore } from '@/components/DragAndDrop/dragAndDropStore';

const props = defineProps<{
  payload: any,
  source: DragSource,
}>();

const dragAndDropStore = useDragAndDropStore();

const draggableRef = ref<HTMLElement>();

const draggable = useDraggable({
  onDragEnd: dragAndDropStore.dropItem,
  onDragStart,
  payload: props.payload,
});
const dragPosition = toRef(draggable, 'dragPosition');

async function onDragStart() {
  await nextTick();
  if (!draggableRef.value) return;

  dragAndDropStore.setDraggedItem({
    elementRef: draggableRef.value,
    payload: props.payload,
    position: dragPosition,
    source: props.source,
  });
}
</script>
