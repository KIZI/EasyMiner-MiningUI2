<template>
  <TaskRuleComponent
    v-model:selected="selected"
    :rule="rule"
    :class="{
      'bg-slate-50': isOdd,
    }"
  >
    <template #actions>
      <VIconButton
        title="Remove from selected rules"
        class="text-red-700"
        :loading="removeRulesMutation.isLoading.value"
        @click="handleRemove(rule)"
      >
        <icon-ph-x-circle class="h-5 w-5 text-red-700" />
      </VIconButton>
      <div class="pl-3">
        <icon-ph-list class="h-5 w-5 cursor-grab text-gray-700" />
      </div>
    </template>
  </TaskRuleComponent>
</template>

<script setup lang="ts">
import { useSelectedRules } from '@selectedRules/composables/useSelectedRules';
import VIconButton from '@/components/VIconButton.vue';
import TaskRuleComponent from '@/components/Task/TaskRule.vue';
import type { TaskRule } from '@/api/tasks/types';

defineProps<{
  rule: TaskRule;
  isOdd: boolean;
}>();

const selected = defineModel<TaskRule[]>('selected');
const { handleRemove, removeRulesMutation } = useSelectedRules();
</script>
