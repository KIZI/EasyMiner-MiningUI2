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
      class="min-h-0 grow border-t"
    >
      <AttributesDropZone
        class="h-full"
        :is-available="isAvailable"
        :is-dragged-over="isDraggedOver"
      >
        <AttributesList
          class="h-full"
          spacing-class="px-6"
        >
          <template #empty>
            <div class="flex items-start gap-x-3">
              <icon-ph-info class="size-6" />
              <div class="space-y-1">
                <div class="font-medium">
                  Create some attributes first.
                </div>
                <div>In order to use a data field in a mining task, it needs to be preprocessed.</div>
              </div>
            </div>
          </template>
        </AttributesList>
      </AttributesDropZone>
    </div>

    <div>
      <div class="flex h-16 items-center border-t px-6">
        <AttributesListSelectionActions />

        <VButton
          v-if="attributesList.selectionModel.isAnySelected"
          class="ml-3 gap-x-3 font-medium hover:bg-red-50"
          variant="ghost"
          size="md"
        >
          <template #icon>
            <icon-ph-trash class="size-5 text-red-700" />
          </template>

          Delete selected
        </VButton>

        <VButton
          class="ml-auto"
          variant="primary"
          size="xl"
          :disabled="!isReadyForMining"
          :loading="dataPreprocessing.isLoading.value"
          @click="goToMining"
        >
          Let's mine
        </VButton>
      </div>
    </div>
  </SectionCard>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDataPreprocessing } from '@preprocessing/composables/useDataPreprocessing'
import { useDataSourceAttributesList } from '@preprocessing/composables/useDataSourceAttributesList'
import AttributesList from '@/components/Attributes/AttributesList.vue'
import AttributesListActions from '@/components/Attributes/AttributesListActions.vue'
import SectionCard from '@/components/Layout/SectionCard.vue'
import SectionTitle from '@/components/Layout/SectionTitle.vue'
import AttributesListSearch from '@/components/Attributes/AttributesListSearch.vue'
import AttributesListSelectionActions from '@/components/Attributes/AttributesListSelectionActions.vue'
import { useActiveMetasourceQuery } from '@/api/metasources/useActiveMetasourceQuery'
import VButton from '@/components/VButton.vue'
import AttributesDropZone from '@/components/Attributes/AttributesDropZone.vue'
import { useDropZone } from '@/components/DragAndDrop/useDropZone'
import type { DatasourceColumn } from '@/api/datasources/types'
import { useProvideAttributesList } from '@/components/Attributes/attributesListInjection'
import { type ListAttribute, useAttributesList } from '@/components/Attributes/useAttributesList'

const router = useRouter()
const metasourceQuery = useActiveMetasourceQuery()

const { attributesList: dataSourceAttributesList } = useDataSourceAttributesList()

const attributes = computed<ListAttribute[]>(() => {
  const attributes = metasourceQuery.data.value?.attribute
  if (!attributes) return []

  return attributes.map((attribute) => {
    return {
      ...attribute,
      isAvailable: true,
      source: 'metasource',
    }
  })
})

const attributesList = useAttributesList({
  attributes,
  isLoading: metasourceQuery.isPending,
  disableSelection: true,
})
useProvideAttributesList(attributesList)

const dataPreprocessing = useDataPreprocessing()

const { dropZoneRef, isAvailable, isDraggedOver } = useDropZone<DatasourceColumn[]>({
  accepts: ['datasource'],
  onDrop: (items) => {
    dataPreprocessing.open(items)
    dataSourceAttributesList.selectionModel.clear()
  },
})

const isReadyForMining = computed(() => (
  metasourceQuery.attributes.value.length > 0
))

function goToMining() {
  router.push('/')
}
</script>
