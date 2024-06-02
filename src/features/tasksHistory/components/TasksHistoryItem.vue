<template>
  <div
    class="flex cursor-pointer items-start gap-x-4 px-6 pb-3 pt-2.5 hover:bg-primary-100"
    :class="{
      'bg-slate-50': isEven,
    }"
    @click="handleLoadTask"
  >
    <div class="relative grow space-y-1">
      <label class="text-sm font-medium leading-relaxed tracking-wide">
        <VCheckbox
          v-if="false"
          class="absolute left-0 mt-1.5 size-4"
        />

        <span>{{ task.name }}</span>
      </label>

      <div class="flex items-baseline gap-x-4 text-xs leading-none">
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
      </div>
    </div>

    <div class="ml-auto flex items-center gap-x-2">
      <span class="mr-4 mt-1 space-x-2 text-xs leading-none">
        <icon-ph-calendar-blank class="mb-px inline-block size-3.5 text-primary-900" />
        <span>{{ formatDate(task.lastModified) }}</span>
      </span>
      <VIconButton
        class="hover:bg-subtle-white"
        :disabled="isActiveTaskLoading"
        @click="handleLoadTask"
      >
        <VSpinner v-if="isLoadTaskActionLoading" class="size-5" />
        <icon-ph-arrow-up v-else class="size-5" />
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
import { computed, watch, watchEffect } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { watchOnce } from '@vueuse/core'
import VIconButton from '@/components/VIconButton.vue'
import VCheckbox from '@/components/Form/VCheckbox.vue'
import { useTasksStore } from '@/stores/tasksStore'
import { formatDate, formatDecimal } from '@/utils/format'
import type { MinerTask } from '@/api/miners/types'
import { useActiveTaskRulesQuery } from '@/api/tasks/useActiveTaskRulesQuery'
import VSpinner from '@/components/VSpinner.vue'
import { useActiveTaskStateQuery } from '@/api/tasks/useActiveTaskStateQuery'
import { api } from '@/api/api'
import { activeBottomSection } from '@/components/Layout'

const props = defineProps<{
  task: MinerTask
  isEven?: boolean
}>()

const tasksStore = useTasksStore()
const activeTaskStateQuery = useActiveTaskStateQuery()
const activeTaskRulesQuery = useActiveTaskRulesQuery()

const isActiveTaskLoading = computed(() => {
  return activeTaskStateQuery.isLoading.value || activeTaskRulesQuery.isLoading.value
})
const isLoadTaskActionLoading = computed(() => {
  return isActiveTaskLoading.value && tasksStore.activeTaskId === props.task.id
})

function handleLoadTask() {
  tasksStore.setActiveTaskId(props.task.id)
}

const deleteMutation = useMutation({
  mutationFn: api.tasks.delete,
})

function handleDelete() {
  deleteMutation.mutate(props.task.id)
}
</script>
