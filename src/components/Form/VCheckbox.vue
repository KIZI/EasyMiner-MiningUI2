<template>
  <input
    v-model="modelValue"
    type="checkbox"
    class="cursor-pointer rounded text-primary-600 focus:ring-primary-500"
    :class="{
      'border-gray-300': !isChecked,
      'border-primary-600': isChecked,
    }"
    :value="value"
  >
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value?: unknown
}>()

const modelValue = defineModel()

const isChecked = computed(() => {
  if (Array.isArray(modelValue.value)) return modelValue.value.includes(props.value)

  return modelValue.value
})
</script>
