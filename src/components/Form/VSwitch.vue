<template>
  <Switch
    v-model="enabled"
    class="group relative inline-flex h-5 w-10 shrink-0 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    :class="{
      'cursor-pointer': !props.disabled,
      'cursor-not-allowed': props.disabled,
    }"
    :disabled="props.disabled"
  >
    <span class="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      class="pointer-events-none absolute size-full rounded-md bg-white"
    />
    <span
      aria-hidden="true"
      :class="[
        'pointer-events-none absolute mx-auto h-[1.125rem] w-10 rounded-full transition-colors duration-200 ease-in-out',
        isSwitchedOn ? 'bg-primary-600' : 'bg-slate-200',
      ]"
    />
    <span
      aria-hidden="true"
      :class="[
        'pointer-events-none absolute left-0 inline-block size-5 rounded-full border shadow ring-0 transition-transform duration-200 ease-in-out',
        'border-gray-200',
        props.disabled ? 'bg-slate-100' : 'bg-white',
        isSwitchedOn ? 'translate-x-5' : 'translate-x-0',
      ]"
    />
  </Switch>
</template>

<script setup lang="ts">
import { Switch } from '@headlessui/vue'
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: any
  disabled?: boolean
}>()
const emit = defineEmits(['update:modelValue'])
const enabled = useVModel(props, 'modelValue', emit)

const isSwitchedOn = computed(() => {
  if (props.disabled) return false
  return enabled.value
})
</script>
