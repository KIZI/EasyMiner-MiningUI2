<template>
  <transition
    v-bind="props"
    :style="cssVars"
    :name="direction"
    css
  >
    <slot />
  </transition>
</template>

<script setup lang="ts">
import { type VueTransitionProps, useTransition } from './useTransition'

type SlideTransitionProps = VueTransitionProps & {
  direction?: 'left' | 'right' | 'up' | 'down'
  distance?: string
}

const props = defineProps<SlideTransitionProps>()
const { distance = '0.125rem' } = props

const { cssVars } = useTransition(props, {
  duration: {
    enter: 200,
    leave: 150,
  },
  cssVars: {
    distance,
  },
})
</script>

<style scoped>
[class*='-enter-active'] {
  transition: all var(--duration-enter) ease-out;
}
[class*='-leave-active'] {
  transition: all var(--duration-leave) ease-in;
}

[class*='-enter-from'],
[class*='-leave-to'] {
  opacity: 0;
}
[class*='-enter-to'],
[class*='-leave-from'] {
  opacity: 100;
}

.left-enter-from,
.left-leave-to {
  transform: translateX(var(--distance));
}

.right-enter-from,
.right-leave-to {
  transform: translateX(calc(var(--distance) * -1));
}

.up-enter-from,
.up-leave-to {
  transform: translateY(var(--distance));
}

.bottom-enter-from,
.bottom-leave-to {
  transform: translateY(calc(var(--distance) * -1));
}
</style>
