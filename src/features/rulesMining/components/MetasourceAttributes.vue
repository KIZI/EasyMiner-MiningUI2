<template>
  <SectionCard>
    <div class="flex items-center justify-between px-4 pb-2 pt-4">
      <SectionTitle class="text-xl font-medium text-gray-900">
        Attributes
      </SectionTitle>
      <div class="flex items-center gap-x-3">
        <AttributesListActions />
      </div>
    </div>

    <AttributesListSearch class="mx-3 mb-2" />
    <AttributesList class="grow overflow-y-auto" />

    <div
      v-if="attributesList.shouldShowSelection.value"
      class="my-4 flex items-center justify-between px-4"
    >
      <AttributesListSelectionActions />

      <div class="space-x-2">
        <VButton
          :disabled="!attributesList.selection.hasItems.value"
          variant="basic"
          size="sm"
          class="gap-x-2 text-xs font-semibold"
          @click="() => addSelectionToCedent('Antecedent')"
        >
          <icon-ph-plus-bold />
          Ant.
        </VButton>

        <VButton
          :disabled="!attributesList.selection.hasItems.value"
          variant="basic"
          size="sm"
          class="gap-x-2 text-xs font-semibold"
          @click="() => addSelectionToCedent('Consequent')"
        >
          <icon-ph-plus-bold />
          Con.
        </VButton>
      </div>
    </div>

    <hr class="border-gray-200">

    <div class="mt-0.5 py-4">
      <div class="text-center">
        <VButton
          type="button"
          size="lg"
          variant="basic"
          @click="onEditAttributes"
        >
          Edit attributes
        </VButton>
      </div>
    </div>
  </SectionCard>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useRulePatternStore } from '@rulesMining/stores/rulePatternStore'
import type { Cedent } from '@/features/rulesMining/types/rulePattern.types'
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

const metasourceAttributes = useMetasourceAttributes()
const rulePatternStore = useRulePatternStore()

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
  rulePatternStore.addItems(attributesList.selection.modelValue.value, cedent)
}
</script>
