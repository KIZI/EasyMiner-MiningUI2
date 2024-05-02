<template>
  <slot v-bind="{ events }" name="trigger">
    <component
      :is="as ?? 'button'"
      v-bind="$attrs"
      v-on="events"
    >
      <slot />
    </component>
  </slot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInjectPopoverState } from './popoverInjectionState'

defineOptions({ inheritAttrs: false })

defineProps<{
  as?: string | object
}>()

const { isOpen, isMouseOver } = useInjectPopoverState()!

function handleClick() {
  isOpen.value = !isOpen.value
}

const events = computed(() => {
  return {
    click: handleClick,
    mouseover: () => isMouseOver.value = true,
    mouseleave: () => isMouseOver.value = false,
  }
})
</script>

<style scoped>

</style>
