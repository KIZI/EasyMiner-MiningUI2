<template>
  <SectionCard class="py-4">
    <SectionTitle class="px-6">
      Tasks history
    </SectionTitle>

    <div class="relative mt-3 min-h-40 grow overflow-y-auto border-y border-slate-200">
      <BlockSpinner
        v-if="isPending || isLoading"
        :darken="isRefetching"
      />
      <div class="divide-y divide-slate-100">
        <TasksHistoryItem
          v-for="(task, i) in tasks"
          :key="task.id"
          :task="task"
          :is-even="Boolean(i % 2)"
        />
      </div>
    </div>

    <div class="grid min-h-12 grid-cols-[1fr_auto_1fr] items-center px-6 pt-4">
      <div />

      <VPagination
        v-if="tasks.length > 0"
        v-bind="pagination.bindings"
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
import VPagination from '@/components/VPagination.vue'
import BlockSpinner from '@/components/BlockSpinner.vue'
import TasksHistoryItem from '@/features/tasksHistory/components/TasksHistoryItem.vue'

const pagination = usePagination()
const tasksQuery = useMinerTasksQuery({ pagination: pagination.state })
const { isPending, isLoading, isRefetching } = tasksQuery
const { tasks } = tasksQuery
</script>
