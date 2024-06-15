<template>
  <Popover>
    <PopoverButton
      type="button"
      class="group inline-flex gap-x-1.5 rounded bg-slate-100 px-3 py-1.5 text-sm font-medium text-gray-800 transition-all hover:bg-slate-200"
      title="Edit (Click) / Remove (Right click)"
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
    </PopoverButton>

    <EditRulePatternItemPopoverForm :item="item" />
  </Popover>
</template>

<script lang="ts" setup>
import EditRulePatternItemPopoverForm from '@rulesMining/components/RulePattern/EditRulePatternItemPopoverForm.vue'
import { formatFixedValue } from '@rulesMining/utils/format'
import { useRulePatternStore } from '@/features/rulesMining/stores/rulePatternStore'
import type { CedentItem } from '@/features/rulesMining/types/rulePattern.types'
import { Popover, PopoverButton } from '@/components/Popover'
import { appConfig } from '@/config/appConfig'
import Truncate from '@/components/Truncate.vue'

const props = defineProps<{
  item: CedentItem
}>()

const rulePatternStore = useRulePatternStore()

function handleRemove() {
  rulePatternStore.removeItemById(props.item.id)
}

// const { createDraggableEvents } = useDraggable(DRAG_SOURCE.RulePatternItemSet, {
//   onDragStart: ({ dataTransfer, payload }) => {
//     dataTransfer.setData('itemId', payload.id);
//     dataTransfer.setData('cedent', payload.cedent);
//   },
// });
// const draggableEvents = computed(() => createDraggableEvents({ payload: props.item }));
</script>
