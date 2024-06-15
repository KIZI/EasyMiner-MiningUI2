<template>
  <transition-group
    v-bind="props"
    :style="cssVars"
    :name="isDirectionDown ? 'section-transition-down' : 'section-transition-up'"
    css
    :persisted="true"
  >
    <slot />
  </transition-group>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { type VueTransitionProps, useTransition } from './useTransition'
import { BOTTOM_SECTIONS } from '@/components/Layout'

const props = defineProps<VueTransitionProps>()
const { cssVars } = useTransition(props)

const sectionsOrder = [
  BOTTOM_SECTIONS.discoveredRules,
  BOTTOM_SECTIONS.tasksHistory,
  BOTTOM_SECTIONS.selectedRules,
]

const isDirectionDown = ref(true)

// watch(activeBottomSection, (nextSection, previousSection) => {
//   const nextIndex = sectionsOrder.indexOf(nextSection)
//   const previousIndex = sectionsOrder.indexOf(previousSection)

//   isDirectionDown.value = nextIndex > previousIndex
// })
</script>

<style>
.section-transition-down-move,
.section-transition-down-enter-active,
.section-transition-down-leave-active,
.section-transition-up-move,
.section-transition-up-enter-active,
.section-transition-up-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.section-transition-down-enter-from,
.section-transition-up-leave-to {
  opacity: 0;
  transform: translateY(8rem);
}
.section-transition-down-leave-to,
.section-transition-up-enter-from {
  opacity: 0;
  transform: translateY(-8rem);
}

.section-transition-down-leave-active,
.section-transition-up-leave-active {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
