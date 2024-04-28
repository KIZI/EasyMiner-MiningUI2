<template>
  <span
    :title="text.length > length ? text : ''"
  >{{ truncate(text, { length }) }}</span>
</template>

<script setup lang="ts">
import { truncate } from 'lodash-es'

withDefaults(defineProps<{
  text: string
  length?: number
}>(), {
  text: '',
  length: 30,
})
</script>
