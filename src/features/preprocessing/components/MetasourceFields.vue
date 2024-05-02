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
          class="h-full overflow-y-auto"
          spacing-class="px-6"
          disable-animation
        >
          <template #beforeItems>
            <div
              v-if="activeTasks.length"
              v-auto-animate
              class="border-b px-6 pb-3 pt-1"
            >
              <div class="mb-2 text-sm font-semibold text-slate-500">
                Creating:
              </div>
              <div
                class="space-y-2"
              >
                <template
                  v-for="task in activeTasks"
                  :key="task.id"
                >
                  <div
                    v-for="(attribute, i) in task.attributes"
                    :key="attribute.id"
                    class="flex items-center"
                  >
                    <template v-if="task.state === 'failed'">
                      <span class="rounded bg-red-50 px-1.5 py-0.5 text-xs font-semibold leading-tight text-red-700">
                        Failed
                      </span>
                    </template>

                    <template v-else-if="task.state === 'done'">
                      <span
                        class="rounded bg-green-50 px-1.5 py-0.5 text-xs font-semibold leading-tight text-green-700"
                      >
                        Success
                      </span>
                    </template>

                    <VSpinner
                      v-else
                      class="size-4 shrink-0 text-primary-800"
                    />

                    <div class="ml-3 mr-auto truncate text-sm font-medium">
                      {{ attribute.columnName }}
                    </div>

                    <template v-if="i === 0">
                      <template v-if="task.state === 'failed'">
                        <button
                          class="ml-2 shrink-0"
                          @click="dataPreprocessing.reopenTask(task)"
                        >
                          <icon-ph-info-bold class="aspect-square w-[22px] text-primary-700" />
                        </button>
                      </template>

                      <template v-if="task.state === 'failed'">
                        <button
                          class="ml-2 shrink-0"
                          @click="dataPreprocessing.removeTask(task)"
                        >
                          <icon-ph-x-bold class="mt-px aspect-square w-[22px]" />
                        </button>
                      </template>
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </template>
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
          <template #itemActions="{ attribute }">
            <!-- <VButton
              variant="ghost"
              class="h-8 w-8 hover:bg-red-100 group-hover:hover:bg-primary-50"
              @click.stop
              @mousedown.stop
            >
              <icon-ph-trash class="h-5 w-5 text-red-700" />
            </VButton> -->
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
import VSpinner from '@/components/VSpinner.vue'

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
const { activeTasks } = dataPreprocessing

const { dropZoneRef, isAvailable, isDraggedOver } = useDropZone<DatasourceColumn[]>({
  accepts: ['datasource'],
  onDrop: (items) => {
    dataPreprocessing.open(items)
    dataSourceAttributesList.selection.clearSelection()
  },
})

const isReadyForMining = computed(() => (
  metasourceQuery.attributes.value.length > 0
))

function goToMining() {
  router.push('/')
}
</script>
