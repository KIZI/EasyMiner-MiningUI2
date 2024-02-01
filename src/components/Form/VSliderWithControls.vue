<template>
  <div class="flex items-center justify-between gap-x-4">
    <input
      v-model="modelValue[0]"
      type="number"
      class="h-5 w-8 rounded border-gray-300 p-0 text-center text-xs focus:border-blue-400 focus:ring-blue-300"
    >
    <VSlider
      v-model="modelValue"
      :tooltips="false"
      :lazy="false"
      v-bind="{
        min,
        max,
        step,
      }"
      class="grow"
    />
    <input
      v-model="modelValue[1]"
      type="number"
      class="h-5 w-8 rounded border-gray-300 p-0 text-center text-xs focus:border-blue-400 focus:ring-blue-300"
    >
  </div>
</template>

<script setup lang="ts">
import { VSlider } from './VSlider';

const modelValue = defineModel<number[]>({default: []});

const props = defineProps<{
  min: number,
  max: number,
  step?: number,
}>();
</script>
