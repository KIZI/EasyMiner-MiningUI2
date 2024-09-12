<template>
  <SectionCard class="pt-4">
    <div class="flex items-center justify-between px-6">
      <SectionTitle class="">
        Tasks history
      </SectionTitle>

      <div class="flex gap-x-4">
        <label
          v-for="option in stateOptions"
          :key="option.value"
          class="flex cursor-pointer select-none items-center gap-x-3 rounded-md bg-slate-100 px-2 py-1.5 text-sm font-medium has-[:checked]:bg-primary-100"
        >
          <VCheckbox
            v-model="stateFilter"
            class="size-5"
            :value="option.value"
          />
          {{ option.label }}
        </label>
      </div>
    </div>

    <div class="relative mt-3 flex min-h-0 grow flex-col border-y border-slate-200">
      <BlockSpinner
        v-if="isLoading || isRefetching"
        :darken="isRefetching"
      />

      <div ref="listRef" class="h-full min-h-0 overflow-y-auto">
        <div v-if="!isLoading && tasks.length === 0" class="grid size-full place-items-center">
          <div class="flex gap-x-3">
            <icon-ph-info class="size-6" />
            There are no tasks in history yet.
          </div>
        </div>

        <div class="relative divide-y divide-slate-100">
          <DynamicScroller
            :items="tasks"
            :min-item-size="70"
          >
            <template #default="{ item, index, active }">
              <DynamicScrollerItem
                :item="item"
                :active="active"
                :size-dependencies="[
                  item.name,
                ]"
                :data-index="index"
                class="min-h-[70px]"
              >
                <TasksHistoryItem
                  :task="item"
                  :is-even="Boolean(index % 2)"
                  :show-state="true"
                />
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
        </div>
      </div>
    </div>

    <div v-if="!isLoading && tasks.length > 0" class="grid min-h-12 grid-cols-[1fr_auto_1fr] items-center px-6 py-4">
      <div />
      <VPagination
        v-if="tasks.length > 0"
        :pagination="pagination"
        class="mx-auto"
      />
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import TasksHistoryItem from '@tasksHistory/components/TasksHistoryItem.vue'
import { useMinerTasksQuery } from '@/api/miners/useMinerTasksQuery'
import { usePagination } from '@/components/Pagination/usePagination'
import SectionCard from '@/components/Layout/SectionCard.vue'
import SectionTitle from '@/components/Layout/SectionTitle.vue'
import VPagination from '@/components/Pagination/VPagination.vue'
import BlockSpinner from '@/components/BlockSpinner.vue'
import type { TaskState } from '@/api/tasks/types'
import { VCheckbox } from '@/components/Form'

const stateOptions = [
  { value: 'solved', label: 'Solved' },
  { value: 'failed', label: 'Failed' },
  { value: 'interrupted', label: 'Interrupted' },
] as const

const stateFilter = ref<TaskState[]>(['solved'])

const listRef = ref<HTMLElement>()

const pagination = usePagination()
// pagination.onPageChange(() => {
//   if (!listRef.value) return
//   listRef.value.scrollTop = 0
// })

const tasksQuery = useMinerTasksQuery({ pagination: pagination.state, state: stateFilter })
pagination.setTotalGetter(() => tasksQuery.data.value?.tasksCount ?? 0)

const { isLoading, isRefetching } = tasksQuery
const { tasks } = tasksQuery
</script>
