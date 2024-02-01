<template>
  <div class="-mx-6 divide-y divide-slate-100 border-y border-slate-200 px-6">
    <ListTransitionGroup>
      <RuleSetRulesItem
        v-for="(rule, i) in rules"
        :key="rule.id"
        v-model:selected="selection"
        :rule="rule"
        :is-odd="i % 2 > 0"
        class="-mx-6 px-6"
      />
    </ListTransitionGroup>
  </div>
</template>

<script setup lang="ts">
import RuleSetRulesItem from '@selectedRules/components/RuleSetRulesItem.vue';
import ListTransitionGroup from '@/components/Transitions/ListTransitionGroup.vue';
import type { TaskRule } from '@/api/tasks/types';

defineProps<{
  rules: TaskRule[];
}>();

const selection = defineModel<TaskRule[]>('selection');
// const { handleRemove, removeRulesMutation } = useSelectedRules();
// const selection = ref<TaskRule[]>([]);

// function removeSelected() {
//   handleRemove(selection.value);
//   selection.value = [];
// }
</script>
