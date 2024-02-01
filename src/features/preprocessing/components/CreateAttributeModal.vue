<template>
  <VModal
    :open="open"
    class="max-w-4xl px-5 pb-4 pt-3"
    @close="handleClose"
  >
    <IframeWrapper class="mt-2 h-[600px]">
      <iframe
        ref="iframeRef"
        class="h-full w-full"
        :src="`/em/attributes/add-attribute?miner=${minerId}&${iframeQueryParam}&mode=iframe`"
        frameborder="0"
      />
    </IframeWrapper>
  </VModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import VModal from '@/components/VModal.vue';
import { useActiveMinerQuery } from '@/api/miners/useActiveMinerQuery';
import IframeWrapper from '@/components/IframeWrapper.vue';
import { useAttributesCreation, type AttributeCreationSource } from '@preprocessing/composables/useAttributesCreation';

const props = defineProps<{
  source: AttributeCreationSource,
}>();

const iframeRef = ref();

const { minerId } = useActiveMinerQuery();
const attributesCreation = useAttributesCreation();

const iframeQueryParam = computed(() => {
  if (Array.isArray(props.source)) {
    const namesString = props.source.map((source) => source.name).join(',');
    return `columnNames=${namesString}`;
  }

  return `column=${props.source.id}`;
});

const state = computed(() => {
  return attributesCreation.getState(props.source);
});
const open = computed(() => state.value === 'opened');

function handleClose() {
  attributesCreation.close(props.source);
}
</script>

  <style scoped></style>
