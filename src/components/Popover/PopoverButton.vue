<template>
  <component
    :is="as ?? 'button'"
    @click="handleClick"
    @mouseover="isMouseOver = true"
    @mouseleave="isMouseOver = false"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { useInjectPopoverState } from './popoverInjectionState'

defineProps<{
  as?: string | object
}>()

const { isOpen, isMouseOver } = useInjectPopoverState()!

function handleClick() {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>

</style>
