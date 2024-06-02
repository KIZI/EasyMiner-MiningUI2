<template>
  <transition-group
    v-bind="props"
    :style="cssVars"
    :name="isDirectionDown ? 'section-down' : 'section-up'"
    css
  >
    <slot />
  </transition-group>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { type VueTransitionProps, useTransition } from './useTransition'
import { BOTTOM_SECTIONS, activeBottomSection } from '@/components/Layout'

const props = defineProps<VueTransitionProps>()
const { cssVars } = useTransition(props)

const sectionsOrder = [
  BOTTOM_SECTIONS.discoveredRules,
  BOTTOM_SECTIONS.tasksHistory,
  BOTTOM_SECTIONS.selectedRules,
]

const isDirectionDown = ref(true)

watch(activeBottomSection, (nextSection, previousSection) => {
  const nextIndex = sectionsOrder.indexOf(nextSection)
  const previousIndex = sectionsOrder.indexOf(previousSection)

  isDirectionDown.value = nextIndex > previousIndex
})
</script>

<style>
.section-down-move,
.section-down-enter-active,
.section-down-leave-active {
  transition:
    transform 1s ease,
    opacity 1s ease;
}

.section-down-enter-active {
  /* transition-delay: 0.25s; */
}

.section-down-enter-from {
  /* opacity: 0; */
  transform: translateY(100%);
}

.section-down-leave-active {
  top: -0.5rem;
}
.section-down-leave-to {
  transform: translateY(-100%);
}

.section-down-leave-active {
  position: absolute;
  width: 100%;
  height: 100%;
}

.section-up-move,
.section-up-enter-active,
.section-up-leave-active {
  transition:
    transform 1s ease,
    opacity 1s ease;
}

.section-up-enter-active {
  /* transition-delay: 0.25s; */
}

.section-up-enter-from,
.section-up-leave-to {
  /* opacity: 0; */
  transform: translateY(-100%);
}

.section-up-leave-active {
  top: 0.5rem;
}
.section-up-leave-to {
  /* opacity: 0; */
  transform: translateY(100%);
}

.section-up-leave-active {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
