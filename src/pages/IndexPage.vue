<template>
  <VContainer class="pb-20">
    <div class="grid grid-cols-[auto_20rem] grid-rows-[600px_auto] gap-2">
      <RulesMining />
      <MetasourceAttributes />

      <div class="flex flex-col items-stretch gap-y-2">
        <DiscoveredRules v-if="rules.length" />
        <TasksHistory v-else />

        <SelectedRules />
      </div>
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import DiscoveredRules from '@discoveredRules/components/DiscoveredRules.vue';
import MetasourceAttributes from '@rulesMining/components/MetasourceAttributes.vue';
import RulesMining from '@rulesMining/components/RulesMining.vue';
import SelectedRules from '@selectedRules/components/SelectedRules.vue';
import TasksHistory from '@tasksHistory/components/TasksHistory.vue';
import { useActiveTaskRulesQuery } from '@/api/tasks/useActiveTaskRulesQuery';
import VContainer from '@/components/Layout/VContainer.vue';

const { rules } = useActiveTaskRulesQuery();
</script>
