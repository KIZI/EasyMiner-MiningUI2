import { reactive, readonly, ref } from 'vue'

const isOpen = ref(false)

export function useRuleSetScorerModal() {
  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return reactive({
    open,
    close,
    isOpen,
  })
}
