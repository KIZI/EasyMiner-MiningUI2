<template>
  <FadeTransition :duration="{ enter: 200, leave: 150 }">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-[100] size-full"
    >
      <div
        class="size-full bg-black"
        :style="{ opacity }"
      />
    </div>
  </FadeTransition>
</template>

<script setup lang="ts">
import { useBackdrop } from './useBackdrop'
import FadeTransition from '@/components/Transitions/FadeTransition.vue'

const { isVisible, opacity } = useBackdrop()
</script>
