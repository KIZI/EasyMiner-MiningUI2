<template>
  <div
    ref="popoverRef"
    class="relative"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref, toRefs, watchEffect } from 'vue'
import { useProvidePopoverState } from './popoverInjectionState'

const props = defineProps<{
  asTooltip?: boolean
}>()

const emit = defineEmits(['close'])

const isOpen = defineModel<boolean>('open', { default: false })

const { asTooltip } = toRefs(props)
useProvidePopoverState({ asTooltip, isOpen })

const popoverRef = ref()

onClickOutside(popoverRef, () => {
  if (!isOpen.value) return
  isOpen.value = false
})

watchEffect(() => {
  if (!isOpen.value) emit('close')
})
</script>
