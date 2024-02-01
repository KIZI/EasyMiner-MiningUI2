import { computed, ref } from 'vue';

export function useAbortController() {
  const abortController = ref(new AbortController());
  const signal = computed(() => abortController.value.signal);

  function abortRequests() {
    abortController.value.abort();
    abortController.value = new AbortController();
  }

  return {
    abortRequests,
    signal,
  };
}
