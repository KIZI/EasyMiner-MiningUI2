<template>
  <component
    :is="rulePatternStore.editedItem?.id === item.id ? PopoverAnchor : 'button'"
    class="group inline-flex gap-x-1.5 rounded bg-slate-100 px-3 py-1.5 text-sm font-medium text-gray-800 transition-colors hover:bg-slate-200"
    title="Edit (Click) / Remove (Right click)"
    @click="rulePatternStore.openItemOptions(item.id)"
    @click.right.prevent="handleRemove"
  >
    <span
      v-if="item.isNegated"
      class="text-2xl leading-4"
    >¬</span>
    <Truncate
      :length="appConfig.truncateLength.attribute"
      :text="item.name"
    />
    <span
      class="text-xs text-primary-700"
    >
      (<span class="font-medium">{{ formatFixedValue(item.fixedValue) }}</span>)
    </span>
  </component>
</template>

<script lang="ts" setup>
import { formatFixedValue } from '@rulesMining/utils/format'
import { useRulePatternStore } from '@rulesMining/stores/rulePatternStore'
import type { CedentItem } from '@rulesMining/types/rulePattern.types'
import { PopoverAnchor } from 'radix-vue'
import { appConfig } from '@/config/appConfig'
import Truncate from '@/components/Truncate.vue'

const props = defineProps<{
  item: CedentItem
}>()

const rulePatternStore = useRulePatternStore()

function handleRemove() {
  rulePatternStore.removeItemById(props.item.id)
}

// function stopEventPropagation(event: MouseEvent | TouchEvent) {
//   if (isOpen.value) event.stopPropagation()
// }

// const events = {
//   mousedown: stopEventPropagation,
//   touchstart: stopEventPropagation,
// }
</script>
