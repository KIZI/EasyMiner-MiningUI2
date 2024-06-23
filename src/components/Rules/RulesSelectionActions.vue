<template>
  <div class="flex min-h-8 items-center gap-x-2">
    <SelectionButtons v-on="{ selectAll, invert, clear }" />

    <div
      v-if="selectionModel.isAnySelected"
      class="flex gap-x-0.5"
    >
      <VButton
        v-if="isAnyNotInSelectedRules"
        variant="ghost"
        size="xs"
        class="gap-x-1.5 px-1"
        :loading="isAddLoading"
        :disabled="isRemoveLoading"
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
        :loading="isRemoveLoading"
        :disabled="isAddLoading"
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
import { computed, ref } from 'vue'
import { useSelectedRules } from '@selectedRules/composables/useSelectedRules'
import SelectionButtons from '@/components/Selection/SelectionButtons.vue'
import VButton from '@/components/VButton.vue'
import { injectRulesGrid } from '@/components/Rules/rulesGrid'

const selectedRules = useSelectedRules()
const rulesGrid = injectRulesGrid()!

const { selection, selectionModel } = rulesGrid
const { clear, invert, selectAll } = selectionModel

const isAnyInSelectedRules = computed(() => selection.value.some(rule => selectedRules.isRuleSelected(rule)))
const isAnyNotInSelectedRules = computed(() => selection.value.some(rule => !selectedRules.isRuleSelected(rule)))

const isAddLoading = ref(false)
const isRemoveLoading = ref(false)

async function handleAdd() {
  const handler = rulesGrid.eventHandlers.addSelected
  if (!handler) return

  isAddLoading.value = true
  await handler()
  isAddLoading.value = false
}

async function handleRemove() {
  const handler = rulesGrid.eventHandlers.removeSelected
  if (!handler) return

  isRemoveLoading.value = true
  await handler()
  isRemoveLoading.value = false
}
</script>
