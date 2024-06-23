<template>
  <div class="absolute inset-0 z-10 h-full">
    <div v-if="darken" class="absolute inset-0 animate-pulse bg-slate-900/15" />
    <VSpinner class="sticky top-1/2 mx-auto size-8 text-brand" />
  </div>
</template>

<script setup lang="ts">
import VSpinner from '@/components/VSpinner.vue'

defineProps<{
  darken?: boolean
}>()
</script>
