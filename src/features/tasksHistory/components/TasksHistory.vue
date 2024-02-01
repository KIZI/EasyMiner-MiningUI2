<template>
  <SectionCard class="py-4">
    <SectionTitle class="px-6">
      Tasks history
    </SectionTitle>

    <div class="mt-2">
      <TasksHistoryItem
        v-for="(task, i) in tasks"
        :key="task.text"
        :task="task"
        :is-even="Boolean(i % 2)"
      />
    </div>

    <div class="mt-6 grid grid-cols-[1fr_auto_1fr] px-6">
      <div class="flex gap-x-3">
        <SelectionButtons />

        <VButton
          variant="ghost"
          size="xs"
          class="gap-x-1 px-1"
        >
          <icon-ph-trash class="h-5 w-5 text-red-700" />
          Remove selected
        </VButton>
      </div>

      <VPagination
        :total-pages="10"
        :current-page="5"
        class="mx-auto"
      />
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import SectionCard from '@/components/Layout/SectionCard.vue';
import SectionTitle from '@/components/Layout/SectionTitle.vue';
import SelectionButtons from '@/components/Selection/SelectionButtons.vue';
import VButton from '@/components/VButton.vue';
import VPagination from '@/components/VPagination.vue';
import TasksHistoryItem from '@/features/tasksHistory/components/TasksHistoryItem.vue';

const tasks = [
  {
    confidence: 0.8,
    id: 26423,
    lift: 1.2,
    ruleLength: 5,
    support: 0.5,
    text: 'status(C) & District(Praha) & LongNameTest([123456;987654]) → Salary([11654.8;12541]) & Test(D)',
  },
  {
    confidence: 0.8,
    id: 26423,
    lift: 1.2,
    ruleLength: 5,
    support: 0.5,
    text: 'status(C) & District(Praha) & LongNameTest([123456;987654]) → Salary([11654.8;12541]) & Test(D)',
  },
  {
    confidence: 0.8,
    id: 26423,
    lift: 1.2,
    ruleLength: 5,
    support: 0.5,
    text: 'status(C) & District(Praha) & LongNameTest([123456;987654]) → Salary([11654.8;12541]) & Test(D)',
  },
  {
    confidence: 0.8,
    id: 26423,
    lift: 1.2,
    ruleLength: 5,
    support: 0.5,
    text: 'status(C) & District(Praha) & LongNameTest([123456;987654]) → Salary([11654.8;12541]) & Test(D)',
  },
];
</script>
