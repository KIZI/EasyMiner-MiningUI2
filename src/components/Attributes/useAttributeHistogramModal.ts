import { ref } from 'vue'

const currentAttribute = ref<{
  id: number
  source: 'datasource' | 'metasource'
} | null>()

export function useAttributeHistogramModal() {
  function open(attributeId: number, source: 'datasource' | 'metasource') {
    currentAttribute.value = {
      id: attributeId,
      source,
    }
  }

  function close() {
    currentAttribute.value = null
  }

  return {
    currentAttribute,
    open,
    close,
  }
}
