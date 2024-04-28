import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const counter = ref(0)
  const target = 10

  const isTargetMet = computed(() => counter.value >= target)

  function increment() {
    counter.value++
  }

  return {
    counter,
    isTargetMet,
    increment,
  }
})

// Usage
const counterStore = useCounterStore()
counterStore.increment()
console.log(counterStore.isTargetMet)
