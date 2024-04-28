<template>
  <slot v-bind="slotData" />
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { useHLField } from './useHLField'

const props = defineProps<{
  name: string
}>()

const { name } = toRefs(props)
const { slotData } = useHLField(name)
</script>
