<template>
  <div class="relative grid w-full items-center">
    <slot />
    <button
      v-if="modelValue"
      title="Clear"
      :class="cn('absolute right-0 h-full pr-2', props.class)"
      @click="modelValue = ''"
    >
      <icon-ph-x :width="18" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const modelValue = defineModel<string>()
</script>
