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
        src="/em/attributes/attribute-histogram/26665?miner=3179&mode=iframe"
        frameborder="0"
      />
    </IframeWrapper>
  </VModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAttributeHistogramModal } from '@/components/Attributes/useAttributeHistogramModal';
import VModal from '@/components/VModal.vue';
import IframeWrapper from '@/components/IframeWrapper.vue';

const attributeHistogramModal = useAttributeHistogramModal();
const open = computed(() => Boolean(attributeHistogramModal.currentAttributeId.value));

const iframe = ref();

window.parent.postMessage({
  type: 'add-attribute',
  state: 'started',
  columnNames: 'amount,birth_number,District', // jména zdrojových sloupců
});
</script>

<style scoped></style>
