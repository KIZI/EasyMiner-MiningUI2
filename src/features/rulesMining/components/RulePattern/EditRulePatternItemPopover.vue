<template>
  <PopoverRoot v-model:open="isOpen">
    <EditRulePatternItemForm
      v-if="editedItem"
      :item="editedItem"
    />
    <slot />
  </PopoverRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRulePatternStore } from '@rulesMining/stores/rulePatternStore'
import { storeToRefs } from 'pinia'
import EditRulePatternItemForm from './EditRulePatternItemPopoverForm.vue'
import PopoverRoot from '@/components/RadixPopover/PopoverRoot.vue'

const rulePatternStore = useRulePatternStore()
const { editedItem } = storeToRefs(rulePatternStore)

const isOpen = computed({
  get() {
    return !!rulePatternStore.editedItem
  },
  set(value) {
    if (!value) {
      rulePatternStore.closeItemOptions()
    }
  },
})
</script>
