<template>
  <SectionCard class="py-4 group-px-6">
    <div class="flex min-h-16 shrink-0 items-start justify-between peer-px">
      <div>
        <div class="flex min-h-8 items-center gap-x-3">
          <VIconButton v-if="!isViewLoading && isFromHistory" title="Go back to tasks history" @click="layout.showTasksHistory()">
            <icon-ph-arrow-left class="size-5" />
          </VIconButton>

          <SectionTitle>
            <template v-if="isMiningInProgress || isTaskStateRunning(state)">
              Task is in progress...
            </template>

            <template v-else-if="isViewLoading">
              Task is loading...
            </template>

            <template v-else-if="task?.state === 'interrupted'">
              Task was interrupted
              <span class="pl-1 text-lg font-normal">(dicovered {{ rules.length }} rules)</span>
            </template>

            <template v-else-if="task?.state === 'failed'">
              Task failed
            </template>

            <template v-else-if="!rules.length">
              No rules discovered
            </template>

            <template v-else>
              Discovered {{ rules.length }} {{ $t('common.rules', rules.length) }}
            </template>
          </SectionTitle>

          <VButton
            v-if="!isViewLoading && isAnyUnselected"
            size="xs"
            variant="ghost"
            class="gap-x-1.5 font-medium"
            icon-class="text-green-700"
            :loading="isAddAllLoading"
            @click="addAllToSelectedRules"
          >
            <template #icon>
              <icon-ph-checks class="size-5" />
            </template>
            Add all to Selected rules
          </VButton>
        </div>

        <div v-if="!isViewLoading" class="mt-1">
          <div class="text-lg font-medium text-primary-900">
            {{ task?.name }}
          </div>
          <div class="mt-1 space-x-4 text-xs leading-none">
            <span v-for="measure in taskDetail?.settings.rule0.iMs" :key="measure.name">
              <span class="pr-1.5">{{ $t(`interestMeasures.${measure.name}.name`) }}:</span>
              <span class="font-semibold text-primary-700">
                {{ formatDecimal(measure.threshold) }}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div class="-mr-2 flex items-center gap-x-2">
        <VButton
          v-if="!isViewLoading && isTaskFinished"
          variant="ghost"
          size="xs"
          class="shrink-0 gap-x-1.5"
          @click="loadTaskToRulePattern"
        >
          <icon-ph-arrow-up class="size-5" />
          Load task to rule pattern
        </VButton>
      </div>
    </div>

    <RulesGrid
      v-model:dataParams="dataParams"
      :rules="rules"
      :is-loading="isViewLoading"
      :is-refetching="isRulesRefetching"
      :task="taskDetail"
      :total-count="rulesCount"
    >
      <template #empty>
        <div class="flex gap-x-3">
          <icon-ph-info class="size-6" />
          No rules were discovered.
        </div>
      </template>

      <template #ruleActions="{ rule }">
        <VIconButton
          :title="selectedRules.isRuleSelected(rule) ? 'Remove from selected rules' : 'Add to selected rules'"
          :loading="selectedRules.isRuleMutationLoading(rule)"
          class="text-green-700 hover:bg-subtle-white"
          @click="selectedRules.handleToggle(rule)"
        >
          <component
            :is="selectedRules.isRuleSelected(rule) ? IconPhCheckCircleFill : IconPhCheckCircle"
            class="size-5"
          />
        </VIconButton>
      </template>

      <template #actions>
        <div class="flex items-center gap-x-5">
          <button class="inline-flex items-center gap-x-2 text-xs hover:underline">
            <icon-ph-arrow-square-out class="size-4 text-gray-700" />
            Task detail
          </button>
          <button class="inline-flex items-center gap-x-2 text-xs hover:underline">
            <icon-ph-export class="size-4 text-gray-700" />
            Export task
          </button>
        </div>
      </template>
    </RulesGrid>
  </SectionCard>
</template>

<script setup lang="ts">
import { type Ref, computed, ref } from 'vue'
import { useRulePatternStore } from '@rulesMining/stores/rulePatternStore'
import { useSelectedRules } from '@selectedRules/composables/useSelectedRules'
import { useRulesMining } from '@rulesMining/composables/useRulesMining'
import { useActiveTaskRulesQuery } from '@/api/tasks/useActiveTaskRulesQuery'
import { useActiveTaskDetailQuery } from '@/api/tasks/useActiveTaskDetailQuery'
import SectionCard from '@/components/Layout/SectionCard.vue'
import SectionTitle from '@/components/Layout/SectionTitle.vue'
import { isTaskStateRunning } from '@/api/tasks/utils'
import VIconButton from '@/components/VIconButton.vue'
import IconPhCheckCircle from '~icons/ph/check-circle.vue'
import IconPhCheckCircleFill from '~icons/ph/check-circle-fill.vue'
import RulesGrid from '@/components/Rules/RulesGrid.vue'
import { type TaskRulesDataParams, createTaskRulesDataParams } from '@/components/Task/taskRulesDataParams'
import { formatDecimal } from '@/utils/format'
import { layout } from '@/components/Layout'
import VButton from '@/components/VButton.vue'

const { isInProgress: isMiningInProgress, startedTaskId } = useRulesMining()
const dataParams = ref(createTaskRulesDataParams())
const rulePatternStore = useRulePatternStore()

const {
  rulesCount,
  rules,
  task,
  state,
  isLoading: isRulesLoading,
  isRefetching: isRulesRefetching,
} = useActiveTaskRulesQuery({
  options: dataParams,
  keepPreviousData: true,
})

const { task: taskDetail, isLoading: isTaskDetailLoading } = useActiveTaskDetailQuery()

const isFromHistory = computed(() => {
  return startedTaskId.value !== task.value?.id
})

const isTaskFinished = computed(() => {
  return !isTaskStateRunning(state.value)
})

function loadTaskToRulePattern() {
  if (!taskDetail.value) return
  rulePatternStore.loadTaskRule(taskDetail.value.settings.rule0)
  document.getElementById('rulesMining')?.scrollIntoView({ behavior: 'smooth' })
}

const selectedRules = useSelectedRules()

const isViewLoading = computed(() => {
  return isMiningInProgress.value || isRulesLoading.value || isTaskDetailLoading.value
})

const rulesNotInSelectedRules = computed(() => {
  return rules.value.filter(rule => !selectedRules.isRuleSelected(rule))
})

const isAddAllLoading = computed(() => {
  const { addRulesMutation } = selectedRules

  const addedRulesLength = addRulesMutation.variables.value?.rules.length
  const rulesNotInSelectedRulesLength = rulesNotInSelectedRules.value.length

  return addedRulesLength === rulesNotInSelectedRulesLength
})

const isAnyUnselected = computed(() => {
  return !!rulesNotInSelectedRules.value.length
})

function addAllToSelectedRules() {
  selectedRules.handleAdd(rulesNotInSelectedRules.value)
}
</script>
