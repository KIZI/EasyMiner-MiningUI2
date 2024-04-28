<template>
  <div class="relative grid max-h-full">
    <div class="absolute inset-0 grid animate-pulse place-items-center bg-gray-300">
      <VSpinner class="size-8" />
    </div>
    <div class="relative">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import VSpinner from '@/components/VSpinner.vue'
</script>
