import { computed, ref } from 'vue'

export function useAbortController() {
  const abortController = ref(new AbortController())
  const signal = computed(() => abortController.value.signal)
  const aborted = ref(false)

  function abort() {
    abortController.value.abort()
    aborted.value = true
  }

  function reset() {
    aborted.value = false
    abortController.value = new AbortController()
  }

  return {
    aborted,
    abort,
    signal,
    reset,
  }
}
