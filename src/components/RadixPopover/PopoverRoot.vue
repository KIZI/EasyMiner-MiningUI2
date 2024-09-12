<template>
  <PopoverRoot v-bind="props" v-model:open="isOpen">
    <slot />
  </PopoverRoot>
</template>

<script setup lang="ts">
import { PopoverRoot } from 'radix-vue'
import type { PopoverRootProps } from 'radix-vue'
import { toRef } from 'vue'
import { useProvidePopoverState } from '@/components/Popover/popoverInjectionState'

const props = defineProps<PopoverRootProps & {
  asTooltip?: boolean
}>()

const isOpen = defineModel<boolean>('open', { default: false })
useProvidePopoverState({ isOpen, asTooltip: toRef(props.asTooltip) })
</script>
