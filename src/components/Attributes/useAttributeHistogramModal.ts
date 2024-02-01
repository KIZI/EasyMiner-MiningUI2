import { ref } from 'vue';

const currentAttributeId = ref<number|null>();

export function useAttributeHistogramModal() {
  function open(attributeId: number) {
    currentAttributeId.value = attributeId;
  }

  function close() {
    currentAttributeId.value = null;
  }

  return {
    currentAttributeId,
    open,
    close,
  };
}
