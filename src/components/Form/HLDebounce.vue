<template>
  <slot v-bind="{ ...bind }" />
</template>

<script setup lang="ts">
import { debounce } from 'lodash-es'
import { computed } from 'vue'

const modelValue = defineModel<string>()

const debouncedSetter = debounce((value, modelValueSnapshot) => {
  if (modelValueSnapshot !== modelValue.value) return
  modelValue.value = value
}, 300)

const debouncedModel = computed({
  get: () => modelValue.value,
  set: value => debouncedSetter(value, modelValue.value),
})

const bind = {
  debouncedModel,
}
</script>
