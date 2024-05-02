<template>
  <transition-group
    v-bind="props"
    :style="cssVars"
    name="list"
    css
  >
    <slot />
  </transition-group>
</template>

<script setup lang="ts">
import { type VueTransitionProps, useTransition } from './useTransition'

const props = defineProps<VueTransitionProps>()
const { cssVars } = useTransition(props)
</script>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(0.5rem);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
