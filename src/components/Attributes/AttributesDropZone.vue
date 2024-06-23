<template>
  <div :class="dropZoneClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import clsx from 'clsx'
import { computed } from 'vue'

const props = defineProps<{
  isDraggedOver: boolean
  isAvailable: boolean
}>()

const dropZoneClass = computed(() => {
  const defaultClass = clsx('relative -mx-1.5 min-h-[10em] rounded border-2 border-dashed px-1.5 py-0.5 transition-all')

  const draggedOverClass = clsx({
    'bg-primary-100 ring-2 ring-primary-400': props.isDraggedOver,
    'bg-transparent': !props.isDraggedOver,
  })

  const draggingActiveClass = clsx({
    'border-primary-400': props.isAvailable,
    'border-transparent': !props.isAvailable,
  })

  return clsx(defaultClass, draggedOverClass, draggingActiveClass)
})
</script>
