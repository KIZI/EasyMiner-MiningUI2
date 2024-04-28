<template>
  <SectionCard class="py-4">
    <SectionTitle class="px-6">
      Tasks history
    </SectionTitle>

    <div class="relative mt-2 min-h-40">
      <BlockSpinner
        v-if="tasksQuery.isFetching.value"
        :darken="tasksQuery.isRefetching.value"
      />
      <TasksHistoryItem
        v-for="(task, i) in tasks"
        :key="task.id"
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
          <icon-ph-trash class="size-5 text-red-700" />
          Remove selected
        </VButton>
      </div>

      <VPagination
        v-bind="pagination.bind.value"
        class="mx-auto"
      />
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import { useMinerTasksQuery } from '@/api/miners/useMinerTasksQuery'
import { usePagination } from '@/api/pagination'
import SectionCard from '@/components/Layout/SectionCard.vue'
import SectionTitle from '@/components/Layout/SectionTitle.vue'
import SelectionButtons from '@/components/Selection/SelectionButtons.vue'
import VButton from '@/components/VButton.vue'
import VPagination from '@/components/VPagination.vue'
import BlockSpinner from '@/components/BlockSpinner.vue'
import TasksHistoryItem from '@/features/tasksHistory/components/TasksHistoryItem.vue'

const pagination = usePagination()
const tasksQuery = useMinerTasksQuery({ pagination: pagination.state })
const { tasks } = tasksQuery
</script>
