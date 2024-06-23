<template>
  <input
    v-model="modelValue"
    type="checkbox"
    class="cursor-pointer rounded border-gray-300 text-primary-600 checked:border-primary-600 focus:ring-primary-500"
    :value="props.value"
  >
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: unknown
}>()
const modelValue = defineModel()
</script>
