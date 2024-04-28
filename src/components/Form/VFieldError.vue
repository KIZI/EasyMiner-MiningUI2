<template>
  <ErrorMessage
    v-if="field.meta.touched"
    class="block text-red-700"
    :name="name"
  />
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { useHLField } from './useHLField'

const props = defineProps<{
  name: string
}>()
const { name } = toRefs(props)

const { field } = useHLField(name)
</script>
