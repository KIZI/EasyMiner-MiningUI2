<template>
  <slot
    name="reference"
    :set-ref="(el: HTMLElement) => referenceRef = el"
  />

  <ScaleTransition>
    <!-- <Teleport to="body"> -->
    <div
      v-if="show"
      ref="floatingRef"
      class="z-10"
      :style="floatingStyles"
    >
      <slot />
    </div>
    <!-- </Teleport> -->
  </ScaleTransition>
</template>

<script setup lang="ts">
import { offset, useFloating } from '@floating-ui/vue'
import { ref, watch } from 'vue'
import ScaleTransition from '@/components/Transitions/ScaleTransition.vue'

defineProps<{
  show?: boolean
}>()

const referenceRef = ref()
const floatingRef = ref()

watch(referenceRef, (val) => {
  console.log('referenceRef', val)
})

const { floatingStyles } = useFloating(referenceRef, floatingRef, {
  placement: 'top',
  strategy: 'fixed',
  transform: false,
  middleware: [
    offset(10),
  ],
})
</script>
