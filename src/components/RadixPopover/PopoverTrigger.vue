<script setup lang="ts">
import { PopoverTrigger, type PopoverTriggerProps } from 'radix-vue'
import { useInjectPopoverState } from '../Popover'

const props = defineProps<PopoverTriggerProps>()

const { triggerEvents } = useInjectPopoverState()!
</script>

<template>
  <PopoverTrigger
    v-bind="props"
    v-on="triggerEvents"
  >
    <slot />
  </PopoverTrigger>
</template>
