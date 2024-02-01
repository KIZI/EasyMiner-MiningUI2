<template>
  <slot
    name="reference"
    :set-ref="(el: HTMLElement) => referenceRef = el"
  />

  <ScaleTransition>
    <div
      v-if="show"
      ref="floatingRef"
      class="z-10"
      :style="floatingStyles"
    >
      <slot />
    </div>
  </ScaleTransition>
</template>

<script setup lang="ts">
import { useFloating, offset } from '@floating-ui/vue';
import { ref } from 'vue';
import ScaleTransition from '@/components/Transitions/ScaleTransition.vue';

defineProps<{
  show?: boolean,
}>();

const referenceRef = ref();
const floatingRef = ref();

const { floatingStyles } = useFloating(referenceRef, floatingRef, {
  placement: 'top',
  transform: false,
  middleware: [
    offset(10),
  ],
});
</script>

<style scoped>

</style>
p
