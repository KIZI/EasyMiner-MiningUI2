<template>
  <VModal
    :open="open"
    class="max-w-4xl px-5 pb-4 pt-3"
    @close="attributeHistogramModal.close"
  >
    <template #title>
      <h2 class="text-lg font-medium">
        Amount
      </h2>
    </template>

    <IframeWrapper class="mt-5">
      <iframe
        ref="iframe"
        class="h-[500px] w-full"
        :src="iframeSource"
        frameborder="0"
      />
    </IframeWrapper>
  </VModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAttributeHistogramModal } from '@/components/Attributes/useAttributeHistogramModal'
import VModal from '@/components/VModal.vue'
import IframeWrapper from '@/components/IframeWrapper.vue'
import { useMinerQuery } from '@/api/miners/useMinerQuery'

const { minerId } = useMinerQuery()
const attributeHistogramModal = useAttributeHistogramModal()

const { currentAttribute } = attributeHistogramModal
const open = computed(() => !!attributeHistogramModal.currentAttribute.value)

const iframeSource = computed(() => {
  if (!currentAttribute.value) return ''
  const prefix = '/easyminercenter/em'

  const isFromDatasource = currentAttribute.value.source === 'datasource'

  const params = new URLSearchParams()
  params.append('miner', minerId.toString())
  params.append('mode', 'iframe')

  if (isFromDatasource) {
    params.append('column', currentAttribute.value.id.toString())
    return `${prefix}/data/column-histogram?${params.toString()}`
  }

  return `${prefix}/attributes/attribute-histogram/${currentAttribute.value.id}?${params.toString()}`
})

const iframe = ref()

// window.parent.postMessage({
//   type: 'add-attribute',
//   state: 'started',
//   columnNames: 'amount,birth_number,District', // jména zdrojových sloupců
// });
</script>

<style scoped></style>
