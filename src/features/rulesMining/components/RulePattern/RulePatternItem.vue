<template>
  <Popover>
    <PopoverButton
      class="group"
      type="button"
    >
      <RulePatternItemTemplate
        :name="item.name"
        :fixed-value="item.fixedValue"
        :is-negated="item.isNegated"
      />
    </PopoverButton>

    <EditRulePatternItemPopoverForm :item="item" />
  </Popover>
</template>

<script lang="ts" setup>
import EditRulePatternItemPopoverForm from '@rulesMining/components/RulePattern/EditRulePatternItemPopoverForm.vue';
import RulePatternItemTemplate from '@/features/rulesMining/components/RulePattern/RulePatternItemTemplate.vue';
import { useRulePatternStore } from '@/features/rulesMining/stores/rulePatternStore';
import type { CedentItem } from '@/features/rulesMining/types/rulePattern.types';
import { Popover, PopoverButton } from '@/components/Popover';

const props = defineProps<{
  item: CedentItem,
}>();

const { openItemOptions } = useRulePatternStore();

// const { createDraggableEvents } = useDraggable(DRAG_SOURCE.RulePatternItemSet, {
//   onDragStart: ({ dataTransfer, payload }) => {
//     dataTransfer.setData('itemId', payload.id);
//     dataTransfer.setData('cedent', payload.cedent);
//   },
// });
// const draggableEvents = computed(() => createDraggableEvents({ payload: props.item }));
</script>
