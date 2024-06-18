<template>
  <input
    v-model="modelValue"
    :class="cn([
      'w-full block rounded py-1 shadow-sm text-sm',
      {
        'border-gray-300 focus:border-primary-500 focus:ring-primary-500': isValid,
        'border-red-300 focus:border-red-500 focus:ring-red-500': !isValid,
      },
    ], props.class)"
    type="text"
  >
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'

const props = withDefaults(defineProps<{
  isValid?: boolean
  class?: HTMLAttributes['class']
}>(), {
  isValid: true,
})

const modelValue = defineModel<string>()
</script>
