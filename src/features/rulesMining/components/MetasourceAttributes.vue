<template>
  <SectionCard>
    <div class="flex items-center justify-between px-4 pb-2 pt-4">
      <SectionTitle class="text-xl font-medium text-gray-900">
        Attributes
      </SectionTitle>
      <div class="flex items-center gap-x-1">
        <AttributesListActions />
      </div>
    </div>

    <AttributesListSearch class="mx-3 mb-2" />
    <AttributesList class="grow">
      <template #itemActions="{ attribute }">
        <AddToPatternPopover
          #="{ events }" content-class="pr-12 py-1.5 pl-2" panel-class="-top-1.5 -right-1.5"
          @select="(cedent) => addAttributeToCedent(attribute, cedent)"
        >
          <VButton
            :disabled="!attribute.isAvailable" variant="ghost"
            class="relative z-20 order-1 size-8 hover:bg-slate-200 disabled:opacity-50 group-hover:hover:bg-primary-50"
            v-on="events" @mousedown.stop @click.stop
          >
            <icon-ph-plus-circle-bold class="size-5 text-primary-600" />
          </VButton>
        </AddToPatternPopover>
      </template>
    </AttributesList>

    <div v-if="attributesList.shouldShowSelection.value" class="flex items-center justify-between border-t border-gray-50 px-4 py-2">
      <AttributesListSelectionActions />

      <div class="space-x-2">
        <VButton
          :disabled="!attributesList.selectionModel.isAnySelected" variant="basic" size="sm"
          class="gap-x-2 text-xs font-semibold" @click="() => addSelectionToCedent('Antecedent')"
        >
          <icon-ph-plus-bold />
          Ant.
        </VButton>

        <VButton
          :disabled="!attributesList.selectionModel.isAnySelected" variant="basic" size="sm"
          class="gap-x-2 text-xs font-semibold" @click="() => addSelectionToCedent('Consequent')"
        >
          <icon-ph-plus-bold />
          Con.
        </VButton>
      </div>
    </div>

    <hr class="border-gray-200">

    <div class="flex h-16 shrink-0 items-center justify-between p-4">
      <div>
        <AddToPatternPopover
          v-if="unusedAttributes.length > 0" #="{ events, isOpen }" content-class="px-3 py-3 pb-12"
          panel-class="-bottom-2 -left-3.5" @select="addUnusedToCedent"
        >
          <VButton
            type="button" size="sm" variant="ghost" class="relative z-30 gap-x-2 font-medium text-gray-700"
            v-on="events"
          >
            <icon-ph-plus-circle-bold class="size-5 text-primary-600" />
            Add all unused
          </VButton>
        </AddToPatternPopover>
      </div>
      <VButton type="button" size="lg" variant="basic" @click="onEditAttributes">
        Edit attributes
      </VButton>
    </div>
  </SectionCard>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useRulePatternStore } from '@rulesMining/stores/rulePatternStore'
import type { Cedent } from '@rulesMining/types/rulePattern.types'
import AddToPatternPopover from './AddToPatternPopover.vue'
import AttributesList from '@/components/Attributes/AttributesList.vue'
import AttributesListActions from '@/components/Attributes/AttributesListActions.vue'
import AttributesListSearch from '@/components/Attributes/AttributesListSearch.vue'
import SectionCard from '@/components/Layout/SectionCard.vue'
import SectionTitle from '@/components/Layout/SectionTitle.vue'
import VButton from '@/components/VButton.vue'
import { useMetasourceAttributes } from '@/composables/useMetasourceAttributes'
import AttributesListSelectionActions from '@/components/Attributes/AttributesListSelectionActions.vue'
import { useAttributesList } from '@/components/Attributes/useAttributesList'
import { useProvideAttributesList } from '@/components/Attributes/attributesListInjection'
import type { MetasourceAttribute } from '@/api/metasources/types'
import { useDragAndDropStore } from '@/components/DragAndDrop/dragAndDropStore'

const metasourceAttributes = useMetasourceAttributes()
const { unusedAttributes } = metasourceAttributes

const rulePatternStore = useRulePatternStore()
const dragAndDropStore = useDragAndDropStore()

const attributesList = useAttributesList({
  attributes: metasourceAttributes.attributes,
  isLoading: metasourceAttributes.isPending,
  dragSource: 'metasource',
})
useProvideAttributesList(attributesList)

const router = useRouter()
function onEditAttributes() {
  router.push('/preprocessing')
}

function addSelectionToCedent(cedent: Cedent) {
  rulePatternStore.addItems(attributesList.selectionModel.getClone(), cedent)
}

function addUnusedToCedent(cedent: Cedent) {
  rulePatternStore.addItems(unusedAttributes.value, cedent)
}

function addAttributeToCedent(attribute: MetasourceAttribute, cedent: Cedent) {
  rulePatternStore.addItem(attribute, cedent)
}

rulePatternStore.$onAction((action) => {
  // if (action.name !== 'hasItem') {
  //   console.log('action', action)
  // }
  if (action.name === 'addItem' || action.name === 'addItems') {
    let items = action.args[0]
    if (!Array.isArray(items)) items = [items]

    for (const item of items) {
      attributesList.selectionModel.removeItem(item)
    }
  }
})
</script>
