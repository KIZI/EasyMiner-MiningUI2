<template>
  <SectionCard>
    <div class="flex items-center justify-between px-6 py-4">
      <SectionTitle>Attributes</SectionTitle>

      <div class="flex items-center gap-x-3">
        <AttributesListActions />
      </div>
    </div>

    <AttributesListSearch class="mx-6 mb-2" />

    <div
      ref="dropZoneRef"
      class="grow border-t"
    >
      <AttributesDropZone
        class="h-full"
        :is-available="isAvailable"
        :is-dragged-over="isDraggedOver"
      >
        <AttributesList
          class="h-full overflow-y-auto"
          spacing-class="px-6"
        >
          <template #empty>
            <div class="flex items-start gap-x-3">
              <icon-ph-info class="h-6 w-6" />
              <div class="space-y-1">
                <div class="font-medium">
                  Create some attributes first.
                </div>
                <div>In order to use a data field in a mining task, it needs to be preprocessed.</div>
              </div>
            </div>
          </template>
          <template #itemActions="{ attribute }">
            <VButton
              variant="ghost"
              class="h-8 w-8 hover:bg-red-100 group-hover:hover:bg-primary-50"
              @click.stop
              @mousedown.stop
            >
              <icon-ph-trash class="h-5 w-5 text-red-700" />
            </VButton>
          </template>
        </AttributesList>
      </AttributesDropZone>
    </div>

    <div>
      <div class="flex h-16 items-center border-t px-6">
        <AttributesListSelectionActions />

        <VButton
          v-if="attributesList.selection.hasItems.value"
          class="ml-3 gap-x-3 font-medium hover:bg-red-50"
          variant="ghost"
          size="md"
        >
          <template #icon>
            <icon-ph-trash class="h-5 w-5 text-red-700" />
          </template>

          Delete selected
        </VButton>

        <VButton
          class="ml-auto"
          variant="primary"
          size="xl"
          :disabled="!isReadyForMining"
          @click="goToMining"
        >
          Let's mine
        </VButton>
      </div>
    </div>
  </SectionCard>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import AttributesList from '@/components/Attributes/AttributesList.vue';
import AttributesListActions from '@/components/Attributes/AttributesListActions.vue';
import SectionCard from '@/components/Layout/SectionCard.vue';
import SectionTitle from '@/components/Layout/SectionTitle.vue';
import AttributesListSearch from '@/components/Attributes/AttributesListSearch.vue';
import AttributesListSelectionActions from '@/components/Attributes/AttributesListSelectionActions.vue';
import { useActiveMetasourceQuery } from '@/api/metasources/useActiveMetasourceQuery';
import VButton from '@/components/VButton.vue';
import type { MetasourceAttribute } from '@/api/metasources/types';
import AttributesDropZone from '@/components/Attributes/AttributesDropZone.vue';
import { useDropZone } from '@/components/DragAndDrop/useDropZone';
import type { DatasourceColumn } from '@/api/datasources/types';
import { useProvideAttributesList } from '@/components/Attributes/attributesListInjection';
import { useAttributesList } from '@/components/Attributes/useAttributesList';
import { useAttributesCreation } from '@preprocessing/composables/useAttributesCreation';

const router = useRouter();
const metasourceQuery = useActiveMetasourceQuery();

type MetasourceListAttribute = MetasourceAttribute & {
  isAvailable: boolean,
};

const attributes = computed<MetasourceListAttribute[]>(() => {
  const attributes = metasourceQuery.data.value?.attribute;
  if (!attributes) return [];

  return attributes.map((attribute) => {
    return {
      ...attribute,
      isAvailable: true,
    };
  });
});

const attributesList = useAttributesList({
  attributes,
  dragSource: 'metasource',
  isLoading: metasourceQuery.isLoading,
});
useProvideAttributesList(attributesList);

const attributesCreation = useAttributesCreation();

const { dropZoneRef, isAvailable, isDraggedOver } = useDropZone<DatasourceColumn[]>({
  accepts: ['datasource'],
  onDrop: (items) => {
    if (items.length === 1) return attributesCreation.open(items[0]);
    attributesCreation.open(items);
  },
});

const isReadyForMining = computed(() => {
  return metasourceQuery.attributes.value.length > 0;
});

function goToMining() {
  router.push('/');
}
</script>
