import { ref } from 'vue';

const isOpen = ref(false);

export function useDataPreprocessingModal() {
  function open() {
    isOpen.value = true;
  }

  return {
    isOpen,
    open,
  };
}
