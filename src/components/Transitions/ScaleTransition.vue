<template>
  <transition
    v-bind="props"
    :style="cssVars"
    name="scale"
    css
  >
    <slot />
  </transition>
</template>

<script setup lang="ts">
import { type VueTransitionProps, useTransition } from './useTransition'

const props = defineProps<VueTransitionProps>()
const { cssVars } = useTransition(props, {
  duration: {
    enter: 150,
    leave: 100,
  },
})
</script>

<style scoped>
.scale-enter-active {
  transition:
    scale var(--duration-enter) ease-out,
    opacity var(--duration-enter) ease-out;
}

.scale-leave-active {
  transition:
    scale var(--duration-enter) ease-out,
    opacity var(--duration-leave) ease-in;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  scale: 0;
}
</style>
