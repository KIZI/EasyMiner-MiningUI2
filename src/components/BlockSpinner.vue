<template>
  <div class="absolute inset-0 flex">
    <div v-if="darken" class="absolute inset-0 animate-pulse bg-slate-900/15" />
    <VSpinner class="m-auto size-8 text-brand" />
  </div>
</template>

<script setup lang="ts">
import VSpinner from '@/components/VSpinner.vue'

defineProps<{
  darken?: boolean
}>();
</script>
