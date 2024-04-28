<template>
  <div
    ref="parentRef"
    class="relative grid"
    :style="`min-height: ${maxHeight}px`"
  >
    <SlideTransition
      :distance="distance"
      direction="right"
    >
      <slot name="left" />
    </SlideTransition>

    <SlideTransition
      :distance="distance"
      direction="left"
    >
      <slot name="right" />
    </SlideTransition>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watchEffect } from 'vue'
import { useElementSize } from '@vueuse/core'
import SlideTransition from '@/components/Transitions/SlideTransition.vue'

const props = withDefaults(defineProps<{
  distance?: string
  preserveHeight?: boolean
}>(), {
  distance: '2rem',
})

const { distance, preserveHeight } = toRefs(props)

const parentRef = ref<HTMLElement>()
const { height } = useElementSize(parentRef)

const maxHeight = ref(0)
watchEffect(() => {
  if (!preserveHeight.value) return

  if (height.value > maxHeight.value) {
    maxHeight.value = height.value
  }
})
</script>

<style scoped>
[class*='-enter-active'],
[class*='-leave-active'] {
  position: absolute;
  width: 100%;
}
</style>
