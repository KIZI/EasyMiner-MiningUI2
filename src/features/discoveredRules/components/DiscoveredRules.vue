<template>
  <SectionCard class="pb-5 pt-4 [&>*]:px-6">
    <div class="flex items-start justify-between">
      <div>
        <div class="flex items-center gap-x-3">
          <SectionTitle>Discovered {{ rules.length }} rule</SectionTitle>

          <VButton
            size="xs"
            variant="ghost"
            class="gap-x-1.5 font-medium"
          >
            <template #icon>
              <icon-ph-checks class="h-5 w-5 text-green-700" />
            </template>
            Add all to Selected rules
          </VButton>
        </div>

        <div class="text-lg text-primary-900">
          {{ task?.name }}
        </div>
      </div>

      <div class="-mr-2 flex items-center gap-x-2">
        <VButton
          variant="ghost"
          size="xs"
          class="shrink-0 gap-x-1.5"
          @click="clearActiveTask"
        >
          <icon-ph-arrow-up class="h-5 w-5" />
          Load task to rule pattern
        </VButton>

        <VButton
          variant="ghost"
          size="xs"
          class="shrink-0 gap-x-1.5"
          @click="clearActiveTask"
        >
          <icon-ph-clock-counter-clockwise class="h-5 w-5" />
          Tasks history
        </VButton>
      </div>
    </div>

    <RulesFilters class="mt-8" />

    <div class="mt-3 divide-y divide-slate-100 border-y border-slate-200">
      <DiscoveredTaskRule
        v-for="(rule, i) in rules"
        :key="rule.text"
        v-model:selected="selection"
        :rule="rule"
        class="-mx-6 px-6"
        :is-odd="i % 2 > 0"
      />
    </div>

    <div class="mt-10">
      <div class="grid grid-cols-[1fr_auto_1fr] items-center">
        <RulesSelectionActions
          v-model:selection="selection"
          :rules="rules"
        />

        <div class="mx-auto">
          <VPagination
            :total-pages="10"
            :current-page="1"
          />
        </div>

        <div class="ml-auto">
          <div class="flex items-center space-x-3">
            <button class="inline-flex items-center gap-x-2 text-xs hover:underline">
              <icon-ph-arrow-square-out class="h-4 w-4 text-gray-700" />
              Task detail
            </button>
            <button class="inline-flex items-center gap-x-2 text-xs hover:underline">
              <icon-ph-export class="h-4 w-4 text-gray-700" />
              Export task
            </button>
          </div>
        </div>
      </div>
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import DiscoveredTaskRule from '@discoveredRules/components/DiscoveredTaskRule.vue';
import { ref } from 'vue';
import { useActiveTaskRulesQuery } from '@/api/tasks/useActiveTaskRulesQuery';
import SectionCard from '@/components/Layout/SectionCard.vue';
import SectionTitle from '@/components/Layout/SectionTitle.vue';
import RulesFilters from '@/components/Rules/RulesFilters.vue';
import VButton from '@/components/VButton.vue';
import { useTasksStore } from '@/stores/tasksStore';
import RulesSelectionActions from '@/components/Rules/RulesSelectionActions.vue';
import VPagination from '@/components/VPagination.vue';
import type { TaskRule } from '@/api/tasks/types';

const { rules, task } = useActiveTaskRulesQuery();
const { clearActiveTask } = useTasksStore();

const selection = ref<TaskRule[]>([]);
</script>
