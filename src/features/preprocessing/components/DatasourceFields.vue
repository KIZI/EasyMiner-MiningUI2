<template>
  <SectionCard>
    <div class="flex items-center justify-between px-6 py-4">
      <SectionTitle>Data fields</SectionTitle>

      <div class="flex items-center gap-x-3">
        <AttributesListActions />
      </div>
    </div>

    <AttributesListSearch class="mx-6 mb-2" />

    <AttributesList
      class="grow overflow-y-auto border-t"
      spacing-class="px-6"
    >
      <template #itemActions="{ attribute }">
        <VButton
          variant="ghost"
          class="size-8 hover:bg-primary-200 group-hover:hover:bg-primary-50"
          @click.stop="dataPreprocessing.open(attribute)"
          @mousedown.stop
        >
          <icon-ph-arrow-right class="size-5 text-primary-700" />
        </VButton>
      </template>
    </AttributesList>

    <div>
      <div class="flex h-16 items-center border-t px-6">
        <AttributesListSelectionActions />

        <VButton
          v-if="attributesList.selection.hasItems.value"
          class="ml-3 gap-x-3 font-medium"
          variant="ghost"
          size="md"
          @click="handleAddSelected"
        >
          <template #icon>
            <icon-ph-arrow-right class="size-5 text-primary-700" />
          </template>

          Add selected to Attributes
        </VButton>

        <label class="ml-auto flex cursor-pointer select-none items-center gap-x-2.5 text-sm font-medium">
          <VCheckbox
            v-model="shouldRemovePrefix"
            class="size-5"
          />
          <span>Remove prefix</span>
        </label>
      </div>
    </div>

    <CreateAttributeModal
      v-for="(task, i) in dataPreprocessing.tasks.value"
      :key="i"
      :task="task"
    />
  </SectionCard>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CreateAttributeModal from '@preprocessing/components/CreateAttributeModal.vue'
import { useDataPreprocessing } from '@preprocessing/composables/useDataPreprocessing'
import { useDataSourceAttributesList } from '@preprocessing/composables/useDataSourceAttributesList'
import AttributesList from '@/components/Attributes/AttributesList.vue'
import AttributesListActions from '@/components/Attributes/AttributesListActions.vue'
import AttributesListSearch from '@/components/Attributes/AttributesListSearch.vue'
import AttributesListSelectionActions from '@/components/Attributes/AttributesListSelectionActions.vue'
import { useProvideAttributesList } from '@/components/Attributes/attributesListInjection'

import SectionCard from '@/components/Layout/SectionCard.vue'
import SectionTitle from '@/components/Layout/SectionTitle.vue'

import VButton from '@/components/VButton.vue'
import VCheckbox from '@/components/Form/VCheckbox.vue'

const { attributesList } = useDataSourceAttributesList()
useProvideAttributesList(attributesList)

const dataPreprocessing = useDataPreprocessing()
function handleAddSelected() {
  dataPreprocessing.open(attributesList.selection.modelValue.value)
  attributesList.selection.clearSelection()
}

const shouldRemovePrefix = ref(false)
</script>
