<template>
  <button
    class="relative"
    :disabled="loading"
  >
    <slot />
    <VSpinner
      v-if="loading"
      class="absolute inset-[-2px] h-[calc(100%+4px)] w-[calc(100%+4px)]"
    />
  </button>
</template>

<script setup lang="ts">
import VSpinner from '@/components/VSpinner.vue';

defineProps<{
  loading?: boolean;
}>();
</script>
