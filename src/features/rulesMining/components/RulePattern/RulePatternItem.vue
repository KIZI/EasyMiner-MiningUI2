<template>
  <Popover v-model:open="isFormOpen" v-on="events">
    <PopoverButton
      type="button"
      class="group inline-flex gap-x-1.5 rounded bg-slate-100 px-3 py-1.5 text-sm font-medium text-gray-800 transition-colors hover:bg-slate-200"
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
import { useRulePatternStore } from '@rulesMining/stores/rulePatternStore'
import type { CedentItem } from '@rulesMining/types/rulePattern.types'
import { computed, ref } from 'vue'
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

const isFormOpen = ref(false)
function stopEventPropagation(event: MouseEvent | TouchEvent) {
  if (isFormOpen.value) event.stopPropagation()
}

const events = {
  mousedown: stopEventPropagation,
  touchstart: stopEventPropagation,
}
</script>
