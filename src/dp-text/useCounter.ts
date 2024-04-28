// composables/useCounter.ts
import { ref } from 'vue';

export function useCounter() {
  const counter = ref(0);

  function increment() {
    counter.value++;
  }

  return {
    counter,
    increment,
  };
}

// components/Counter.vue
<script setup lang="ts">
import { useCounter } from '@/composables/useCounter';

const {counter, increment} = useCounter();
</script>