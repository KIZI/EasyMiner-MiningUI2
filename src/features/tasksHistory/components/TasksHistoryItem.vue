<template>
  <div
    class="flex cursor-pointer items-start gap-x-4 px-6 pb-3 pt-2.5 hover:bg-primary-100"
    :class="{
      'bg-slate-50': isEven,
    }"
    @click="handleLoadTask"
  >
    <div class="relative grow space-y-1">
      <VCheckbox
        v-if="false"
        class="absolute left-0 mt-1.5 size-4"
      />
      <div class="text-sm font-medium leading-relaxed tracking-wide">
        <span>{{ task.name }}</span>
      </div>

      <div class="flex items-baseline gap-x-4 text-xs leading-none">
        <template v-if="showState">
          <span v-if="task.state === 'solved'" class="rounded bg-primary-100 px-1 py-0.5 font-medium text-primary-900">Solved</span>
          <span v-if="task.state === 'failed'" class="rounded bg-red-100 px-1 py-0.5 font-medium text-red-900">Failed</span>
          <span v-if="task.state === 'interrupted'" class="rounded bg-yellow-100 px-1 py-0.5 font-medium text-yellow-900">Interrupted</span>
        </template>

        <span class="space-x-1.5 capitalize">
          <span>{{ $t('common.rules', task.rulesCount) }}:</span>
          <span class="font-semibold text-primary-900">
            {{ task.rulesCount }}
          </span>
        </span>

        <span
          v-for="measure in task.interestMeasure"
          :key="measure.name"
        >
          <span>{{ $t(`interestMeasures.${measure.name}.name`) }}</span>
          <template v-if="measure.threshold">
            <span>:</span>
            <span class="ml-1.5 font-semibold text-primary-900">
              {{ formatDecimal(measure.threshold) }}
            </span>
          </template>
        </span>

        <span class="ml-auto mt-1 space-x-2 text-xs leading-none">
          <icon-ph-calendar-blank class="mb-px inline-block size-3.5 text-primary-900" />
          <span>{{ formatDate(task.lastModified) }}</span>
        </span>
      </div>
    </div>

    <div class="ml-auto flex items-center gap-x-2">
      <VIconButton
        class="hover:bg-subtle-white"
        @click="handleLoadTask"
      >
        <icon-ph-arrow-right class="size-5" />
      </VIconButton>
      <VIconButton
        v-if="false"
        class="hover:bg-red-50"
        @click="handleDelete"
      >
        <icon-ph-trash class="size-5 text-red-700" />
      </VIconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import VIconButton from '@/components/VIconButton.vue'
import VCheckbox from '@/components/Form/VCheckbox.vue'
import { useTasksStore } from '@/stores/tasksStore'
import { formatDate, formatDecimal } from '@/utils/format'
import type { MinerTask } from '@/api/miners/types'
import { api } from '@/api/api'
import { layout } from '@/components/Layout'

const props = defineProps<{
  task: MinerTask
  isEven?: boolean
  showState?: boolean
}>()

const tasksStore = useTasksStore()

function handleLoadTask() {
  tasksStore.setActiveTaskId(props.task.id)
  layout.showDiscoveredRules()
}

const deleteMutation = useMutation({
  mutationFn: api.tasks.delete,
})

function handleDelete() {
  deleteMutation.mutate(props.task.id)
}
</script>
