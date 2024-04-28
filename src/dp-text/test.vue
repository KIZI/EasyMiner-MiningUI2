<template>
  Count is:
  <span>{{ count }}</span>
  <button @click="increment">
    +
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(1)

function increment() {
  count.value++
}
</script>
