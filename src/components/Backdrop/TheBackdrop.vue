<template>
  <FadeTransition :duration="{enter: 200, leave: 150}">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-[100] h-full w-full"
    >
      <div
        class="h-full w-full bg-black"
        :style="{opacity}"
      />
    </div>
  </FadeTransition>
</template>

<script setup lang="ts">
import FadeTransition from '@/components/Transitions/FadeTransition.vue';
import { useBackdrop } from './useBackdrop';

const { isVisible, opacity } = useBackdrop();
</script>
