<template>
  <div class="group flex min-h-0 flex-col">
    <div class="flex gap-x-4">
      <div class="font-semibold capitalize">
        {{ cedent }}
      </div>
      <VButton
        v-if="itemSet.length"
        :title="`Clear ${cedent}`"
        variant="ghost"
        class="hidden size-6 text-red-700 hover:bg-red-50 group-hover:inline-flex"
        @click="clearItems"
      >
        <icon-ph-x class="size-5" />
      </VButton>
    </div>
    <div
      ref="dropZoneRef"
      class="mt-2 h-full min-h-0"
    >
      <AttributesDropZone
        :is-dragged-over="dropZone.isDraggedOver.value"
        :is-available="dropZone.isAvailable.value"
        class="flex h-full min-h-0 flex-col"
      >
        <i
          v-if="!itemSet.length"
          class="text-sm text-gray-700"
        >
          Add some attributes
          <template v-if="cedent === 'Antecedent'"> or leave empty</template>
          ...
        </i>
        <div
          class="flex h-full min-h-0 flex-wrap content-start items-start gap-2"
        >
          <DraggableClone
            v-for="item in itemSet"
            :key="item.id"
            :source="dragSource"
            :payload="item"
          >
            <RulePatternItem :item="item" />
          </DraggableClone>
        </div>
      </AttributesDropZone>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { computed, watchEffect } from 'vue'
import RulePatternItem from '@rulesMining/components/RulePattern/RulePatternItem.vue'
import { useRulePatternStore } from '@rulesMining/stores/rulePatternStore'
import { CEDENT, type Cedent } from '@rulesMining/types/rulePattern.types'
import AttributesDropZone from '@/components/Attributes/AttributesDropZone.vue'
import DraggableClone from '@/components/DragAndDrop/DraggableClone.vue'
import { useDropZone } from '@/components/DragAndDrop/useDropZone'
import { DragSources } from '@/components/DragAndDrop/dragAndDropStore'
import { autoAnimateKeyframeEffect } from '@/utils/autoAnimate'
import VButton from '@/components/VButton.vue'
import type { MetasourceAttribute } from '@/api/metasources/types'

const props = defineProps<{
  cedent: Cedent
}>()

const [itemListRef, enableAnimation] = useAutoAnimate(autoAnimateKeyframeEffect)
const rulePatternStore = useRulePatternStore()
const itemSet = computed(() => rulePatternStore.getCedentItems(props.cedent))

const dragSource = computed(() => {
  if (props.cedent === CEDENT.Antecedent) return DragSources.antecedent
  return DragSources.consequent
})

const otherCedentDragSource = computed(() => {
  if (props.cedent === CEDENT.Antecedent) return DragSources.consequent
  return DragSources.antecedent
})

const dropZone = useDropZone<MetasourceAttribute[] | MetasourceAttribute>({
  accepts: [DragSources.metasource, otherCedentDragSource.value],
  onDrop: (payload) => {
    const attributes = Array.isArray(payload) ? payload : [payload]
    attributes.forEach((attribute) => {
      rulePatternStore.addItem(attribute, props.cedent)
    })
  },
})
const { dropZoneRef } = dropZone

function clearItems() {
  rulePatternStore.clearItems(props.cedent)
}

watchEffect(() => {
  enableAnimation(itemSet.value.length > 1)
})
</script>
