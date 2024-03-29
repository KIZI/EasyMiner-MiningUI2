<template>
  <div class="flex min-h-[2rem] items-center gap-x-2">
    <SelectionButtons v-on="{ selectAll, invertSelection, clearSelection, }" />

    <div
      v-if="bulkSelection.length"
      class="flex gap-x-0.5"
    >
      <VButton
        v-if="isAnyNotInSelectedRules"
        variant="ghost"
        size="xs"
        class="gap-x-1.5 px-1"
        :loading="selectedRules.addRulesMutation.isLoading.value"
        :disabled="selectedRules.removeRulesMutation.isLoading.value"
        @click="handleAdd"
      >
        <template #icon>
          <icon-ph-check-circle class="h-5 w-5 text-green-700" />
        </template>

        Add selected
      </VButton>

      <VButton
        v-if="isAnyInSelectedRules"
        variant="ghost"
        size="xs"
        class="gap-x-1 px-1"
        :loading="selectedRules.removeRulesMutation.isLoading.value"
        :disabled="selectedRules.addRulesMutation.isLoading.value"
        @click="handleRemove"
      >
        <template #icon>
          <icon-ph-x-circle class="h-5 w-5 text-red-700" />
        </template>

        Remove selected
      </VButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { cloneDeep } from 'lodash-es';
import type { TaskRule } from '@/api/tasks/types';
import { useSelectedRules } from '@selectedRules/composables/useSelectedRules';
import SelectionButtons from '@/components/Selection/SelectionButtons.vue';
import VButton from '@/components/VButton.vue';

const props = defineProps<{
  rules: TaskRule[];
}>();
const rules = computed(() => {
  return cloneDeep(props.rules);
});

const selectedRules = useSelectedRules({
  onMutationSuccess: () => {
    clearSelection();
  },
});
const { isRuleSelected } = selectedRules;

const bulkSelection = defineModel<TaskRule[]>('selection', { required: true });
const isAnyInSelectedRules = computed(() => bulkSelection.value.some((rule) => isRuleSelected(rule)));
const isAnyNotInSelectedRules = computed(() => bulkSelection.value.some((rule) => !isRuleSelected(rule)));

function selectAll() {
  bulkSelection.value = rules.value;
}
function invertSelection() {
  bulkSelection.value = rules.value.filter((rule) => !bulkSelection.value.includes(rule));
}
function clearSelection() {
  bulkSelection.value = [];
}

function handleAdd() {
  selectedRules.handleAdd(bulkSelection.value);
}
function handleRemove() {
  selectedRules.handleRemove(bulkSelection.value);
}
</script>
