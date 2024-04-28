<template>
  <input
    v-bind="attrsExcludingClass"
    v-model="modelValue"
    :class="defaultTwClass([
      'w-full block rounded py-1 shadow-sm text-sm',
      {
        'border-gray-300 focus:border-primary-500 focus:ring-primary-500': isValid,
        'border-red-300 focus:border-red-500 focus:ring-red-500': !isValid,
      },
    ])"
    type="text"
  >
</template>

<script setup lang="ts">
import { useAttrsExcludingClass } from '@/composables/useAttrsExcludingClass'
import { useDefaultTwClass } from '@/composables/useDefaultTwClass'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  isValid?: boolean
}>(), {
  isValid: true,
})

const modelValue = defineModel<string>()

const { attrsExcludingClass } = useAttrsExcludingClass()
const { defaultTwClass } = useDefaultTwClass()
</script>
