<template>
  <div class="flex min-h-8 items-center gap-x-2">
    <SelectionButtons v-on="{ selectAll, invertSelection, clearSelection }" />

    <div
      v-if="bulkSelection.hasItems"
      class="flex gap-x-0.5"
    >
      <VButton
        v-if="isAnyNotInSelectedRules"
        variant="ghost"
        size="xs"
        class="gap-x-1.5 px-1"
        :loading="selectedRules.addRulesMutation.isPending.value"
        :disabled="selectedRules.removeRulesMutation.isPending.value"
        @click="handleAdd"
      >
        <template #icon>
          <icon-ph-check-circle class="size-5 text-green-700" />
        </template>

        Add selected
      </VButton>

      <VButton
        v-if="isAnyInSelectedRules"
        variant="ghost"
        size="xs"
        class="gap-x-1 px-1 hover:bg-red-50"
        :loading="selectedRules.removeRulesMutation.isPending.value"
        :disabled="selectedRules.addRulesMutation.isPending.value"
        @click="handleRemove"
      >
        <template #icon>
          <icon-ph-x-circle class="size-5 text-red-700" />
        </template>

        Remove selected
      </VButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useSelectedRules } from '@selectedRules/composables/useSelectedRules'
import type { TaskRule } from '@/api/tasks/types'
import SelectionButtons from '@/components/Selection/SelectionButtons.vue'
import VButton from '@/components/VButton.vue'
import { useSelectionModel } from '@/composables/useSelectionModel'

const props = defineProps<{
  rules: TaskRule[]
}>()

const { rules } = toRefs(props)

const selection = defineModel<TaskRule[]>('selection', { default: [] })

const bulkSelection = useSelectionModel({ items: rules, modelValue: selection })
const { selectAll, invertSelection, clearSelection } = bulkSelection

const selectedRules = useSelectedRules({
  onMutationSuccess: () => {
    clearSelection()
  },
})
const { isRuleSelected } = selectedRules

const isAnyInSelectedRules = computed(() => bulkSelection.selected.value.some(rule => isRuleSelected(rule)))
const isAnyNotInSelectedRules = computed(() => bulkSelection.selected.value.some(rule => !isRuleSelected(rule)))

function handleAdd() {
  selectedRules.handleAdd(bulkSelection.selected.value)
}
function handleRemove() {
  selectedRules.handleRemove(bulkSelection.selected.value)
}
</script>
