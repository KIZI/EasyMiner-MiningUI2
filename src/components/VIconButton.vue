<template>
  <VButton
    class="relative p-1"
    variant="ghost"
    :disabled="loading"
  >
    <slot />
    <VSpinner
      v-if="loading"
      class="absolute inset-[-2px] size-[calc(100%+4px)]"
    />
  </VButton>
</template>

<script setup lang="ts">
import VSpinner from '@/components/VSpinner.vue'
import VButton from '@/components/VButton.vue'

defineProps<{
  loading?: boolean
}>()
</script>
