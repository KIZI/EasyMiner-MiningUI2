<template>
  Count is:
  <span>{{ value }}</span>
  <button @click="increment">
    +
  </button>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const count = ref(1)
const multiplier = ref(2)

const value = computed(() => {
  return count.value * multiplier.value
})

function increment() {
  count.value++
}

watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})
</script>
