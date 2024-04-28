<template>
  <RadioGroup
    v-model="modelValue"
    class="flex gap-x-1.5"
  >
    <RadioGroupOption
      v-for="(option, index) in options"
      :key="index"
      v-slot="{ checked }"
      :value="option.value"
    >
      <button
        type="button"
        class="rounded border border-slate-200 px-2 py-0.5 text-xs"
        :class="{
          'bg-slate-200': checked,
          '': !checked,
        }"
      >
        {{ option.label }}
      </button>
    </RadioGroupOption>
  </RadioGroup>
</template>

<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupOption,
} from '@headlessui/vue'

defineProps<{
  options: {
    label: string
    value: string
  }[]
}>()
const modelValue = defineModel<string>()
</script>
