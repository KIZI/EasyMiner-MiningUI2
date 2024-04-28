<template>
  <transition
    v-bind="props"
    :style="cssVars"
    name="fade"
    css
  >
    <slot />
  </transition>
</template>

<script setup lang="ts">
import { type VueTransitionProps, useTransition } from './useTransition'

const props = defineProps<VueTransitionProps>()
const { cssVars } = useTransition(props)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity ease;
}

.fade-enter-active {
  transition-duration: var(--duration-enter);
}
.fade-leave-active {
  transition-duration: var(--duration-leave);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
