<template>
  <SectionCard class="py-4 group-px-6">
    <div class="min-h-16 peer-px">
      <div class="flex shrink-0 items-start justify-between">
        <div class="flex min-h-8 items-center gap-x-3">
          <VIconButton
            v-if="!isViewLoading && isFromHistory" title="Go back to tasks history"
            @click="layout.showTasksHistory()"
          >
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
              <span class="pl-1 text-lg font-normal">(dicovered {{ rulesCount }} rules)</span>
            </template>
            <template v-else-if="task?.state === 'failed'">
              Task failed
            </template>
            <template v-else-if="!rulesCount">
              No rules discovered
            </template>
            <template v-else>
              Discovered {{ rulesCount }} {{ $t('common.rules', rulesCount) }}
            </template>
          </SectionTitle>
          <VButton
            v-if="!isViewLoading && isAnyNotInSelectedRules" size="xs" variant="ghost"
            class="gap-x-1.5 font-medium" icon-class="text-green-700" :loading="isAddAllLoading"
            @click="addAllToSelectedRules"
          >
            <template #icon>
              <icon-ph-checks class="size-5" />
            </template>
            Add all to Selected rules
          </VButton>
        </div>
        <div class="-mr-2 flex shrink-0 items-center gap-x-2">
          <VButton
            v-if="!isViewLoading && isTaskFinished" variant="ghost" size="xs" class="gap-x-1.5"
            @click="loadTaskToRulePattern"
          >
            <icon-ph-arrow-up class="size-5" />
            Load task to rule pattern
          </VButton>
        </div>
      </div>
      <div v-if="!isViewLoading" class="mt-1">
        <div class="text-lg font-medium text-primary-900">
          {{ task?.name }}
        </div>
        <div class="mt-2 space-x-4 text-xs leading-none">
          <span v-for="measure in task?.settings.rule0.iMs" :key="measure.name">
            <span class="pr-1.5">
              {{ $t(`interestMeasures.${measure.name}.name`) }}{{ measure.threshold ? ':' : '' }}
            </span>
            <span v-if="measure.threshold" class="font-semibold text-primary-700">
              {{ formatDecimal(measure.threshold) }}
            </span>
          </span>
        </div>
      </div>
    </div>

    <RulesGrid :task="task" highlight-in-selected-rules list-id="discoveredRulesList">
      <template #empty>
        <div class="flex gap-x-3">
          <icon-ph-info class="size-6" />
          No rules were discovered.
        </div>
      </template>

      <template #ruleActions="{ rule }">
        <VIconButton
          :title="selectedRules.isRuleSelected(rule) ? 'Remove from selected rules' : 'Add to selected rules'"
          :loading="selectedRules.isRuleSelectionLoading(rule)" class="text-green-700 hover:bg-subtle-white"
          @click="toggleSelectedRule(rule)"
        >
          <component
            :is="selectedRules.isRuleSelected(rule) ? IconPhCheckCircleFill : IconPhCheckCircle"
            class="size-5"
          />
        </VIconButton>
      </template>

      <template #actions>
        <div v-if="task" class="flex items-center gap-x-5">
          <a
            target="_blank" :href="externalUrls.taskDetail(task.id)"
            class="inline-flex items-center gap-x-1.5 text-xs hover:underline"
          >
            <icon-ph-arrow-square-out class="size-4 text-gray-700" />
            Task detail
          </a>
          <PopoverRoot>
            <PopoverTrigger>
              <VButton variant="ghost" size="xs" class="gap-x-1.5">
                <icon-ph-export class="size-4 text-gray-700" />
                Export task
              </VButton>
            </PopoverTrigger>

            <PopoverContent
              :align-offset="-8" :side-offset="6" align="end" side="top" class="" :class="[
                'z-[110]',
                'animation-duration-300',
                'data-[state=open]:animate-in',
                'data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0',
                'data-[state=open]:fade-in-0',
                'data-[state=open]:data-[side=bottom]:slide-in-from-top-1',
                'data-[state=open]:data-[side=left]:slide-in-from-right-1',
                'data-[state=open]:data-[side=right]:slide-in-from-left-1',
                'data-[state=open]:data-[side=top]:slide-in-from-bottom-1',
                'data-[state=closed]:data-[side=bottom]:slide-out-to-top-1',
                'data-[state=closed]:data-[side=left]:slide-out-to-right-1',
                'data-[state=closed]:data-[side=right]:slide-out-to-left-1',
                'data-[state=closed]:data-[side=top]:slide-out-to-bottom-1',
              ]"
            >
              <div class="max-w-md text-pretty rounded-md bg-white px-3 pb-4 pt-2 shadow-lg ring-1 ring-black/10">
                <div class="mb-3.5 text-md font-medium">
                  Export discovered rules:
                </div>
                <div class="flex flex-col gap-3">
                  <a
                    class="inline-flex items-center gap-x-2 hover:underline"
                    :href="externalUrls.exportTask(task.id).details" target="_blank" size="md"
                  >
                    <icon-ph-export class="size-5 text-gray-700" />
                    <span class="text-xs">Task details (GUHA PMML)</span>
                  </a>
                  <a
                    class="inline-flex items-center gap-x-2 hover:underline"
                    :href="externalUrls.exportTask(task.id).settings" target="_blank" size="md"
                  >
                    <icon-ph-export class="size-5 text-gray-700" />
                    <span class="text-xs">Task setting (GUHA PMML)</span>
                  </a>
                  <a
                    class="inline-flex items-center gap-x-2 hover:underline"
                    :href="externalUrls.exportTask(task.id).plainRules" target="_blank" size="md"
                  >
                    <icon-ph-export class="size-5 text-gray-700" />
                    <span class="text-xs">Plain Text</span>
                  </a>
                </div>
              </div>

              <PopoverArrow class="fill-primary-700/50" :width="14" :height="7" />
            </PopoverContent>
          </PopoverRoot>
        </div>
      </template>
    </RulesGrid>
  </SectionCard>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRulePatternStore } from '@rulesMining/stores/rulePatternStore'
import { useSelectedRules } from '@selectedRules/composables/useSelectedRules'
import { useRulesMining } from '@rulesMining/composables/useRulesMining'
import { keepPreviousData } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { useRafFn } from '@vueuse/core'
import { PopoverArrow, PopoverContent } from 'radix-vue'
import { useActiveTaskRulesQuery } from '@/api/tasks/useActiveTaskRulesQuery'
import { useActiveTaskDetailQuery } from '@/api/tasks/useActiveTaskDetailQuery'
import SectionCard from '@/components/Layout/SectionCard.vue'
import SectionTitle from '@/components/Layout/SectionTitle.vue'
import { isTaskStateRunning } from '@/api/tasks/utils'
import VIconButton from '@/components/VIconButton.vue'
import IconPhCheckCircle from '~icons/ph/check-circle.vue'
import IconPhCheckCircleFill from '~icons/ph/check-circle-fill.vue'
import RulesGrid from '@/components/Rules/RulesGrid.vue'
import { formatDecimal } from '@/utils/format'
import { layout } from '@/components/Layout'
import VButton from '@/components/VButton.vue'
import { useRulesGrid } from '@/components/Rules/rulesGrid'
import { useTasksStore } from '@/stores/tasksStore'
import type { TaskRule } from '@/api/tasks/types'
import { useActiveRuleSetRulesQuery } from '@/api/ruleSets/useRuleSetRulesQuery'
import { queryClient } from '@/libs/vueQuery'
import { queryKeys } from '@/api/queryKeys'
import { externalUrls } from '@/utils/externalUrls'
import PopoverRoot from '@/components/RadixPopover/PopoverRoot.vue'
import PopoverTrigger from '@/components/RadixPopover/PopoverTrigger.vue'

const { isInProgress: isMiningInProgress, startedTaskId } = useRulesMining()
const rulePatternStore = useRulePatternStore()
const selectedRules = useSelectedRules()
const { activeTaskId } = storeToRefs(useTasksStore())

const rulesGrid = useRulesGrid({
  filterByMeasures: true,
})

const activeTaskRulesQuery = useActiveTaskRulesQuery({
  options: rulesGrid.requestParams,
  queryOptions: {
    placeholderData: (data) => {
      if (data?.task.id === activeTaskId.value) {
        return keepPreviousData(data)
      }
    },
  },
})
const { state, isPending: isRulesPending } = activeTaskRulesQuery

const isTaskFinished = computed(() => {
  return state.value && !isTaskStateRunning(state.value)
})

const { task, isPending: isTaskDetailPending } = useActiveTaskDetailQuery({
  queryParams: {
    enabled: computed(() => !isMiningInProgress.value && !isRulesPending.value),
  },
})
const rulesCount = computed(() => task.value?.rulesCount ?? 0)

const activeRuleSetRulesQuery = useActiveRuleSetRulesQuery()
const { activeRuleSetId } = activeRuleSetRulesQuery

const isViewLoading = computed(() => {
  return isMiningInProgress.value || isRulesPending.value || isTaskDetailPending.value
})

rulesGrid.setDataState({
  rules: activeTaskRulesQuery.rules,
  totalCount: activeTaskRulesQuery.rulesCount,
  isLoading: isViewLoading,
  isRefetching: activeTaskRulesQuery.isRefetching,
})

rulesGrid.setEventHandlers({
  addSelected: async () => {
    await addToSelectedRules(rulesGrid.selection.value.filter(rule => !selectedRules.isRuleSelected(rule)))
    rulesGrid.selectionModel.clear()
  },
  removeSelected: async () => {
    await removeFromSelectedRules(rulesGrid.selection.value.filter(rule => selectedRules.isRuleSelected(rule)))
    rulesGrid.selectionModel.clear()
  },
})

rulesGrid.setUiState({
  getItemProps(item) {
    if (selectedRules.wasRuleAdded(item)) {
      return {
        'data-added': 'true',
      }
    }
    if (selectedRules.wasRuleRemoved(item)) {
      return {
        'data-removed': 'true',
      }
    }
  },
})

watch(() => task.value?.id, () => rulesGrid.reset())

const isFromHistory = computed(() => {
  return startedTaskId.value !== task.value?.id
})

function loadTaskToRulePattern() {
  if (!task.value) return
  rulePatternStore.loadTaskRule(task.value.settings.rule0)
  document.getElementById('rulesMining')?.scrollIntoView({ behavior: 'smooth' })
}

async function addToSelectedRules(rules: TaskRule[]) {
  try {
    resetMutationsState()
    await selectedRules.addRules(rules)
    await onSelectionSuccess()
  }
  catch (e) { }
}

async function removeFromSelectedRules(rules: TaskRule[]) {
  try {
    resetMutationsState()
    await selectedRules.removeRules(rules)
    await onSelectionSuccess()
  }
  catch (e) { }
}

async function toggleSelectedRule(rules: TaskRule) {
  try {
    resetMutationsState()
    await selectedRules.toggle(rules)
    await onSelectionSuccess()
  }
  catch (e) { }
}

function resetMutationsState() {
  selectedRules.removeRulesMutation.reset()
  selectedRules.addRulesMutation.reset()
}

async function onSelectionSuccess() {
  queryClient.invalidateQueries({ queryKey: queryKeys.ruleSets.rules(activeRuleSetId), refetchType: 'none' })
  await activeRuleSetRulesQuery.refetch()
  queryClient.refetchQueries({ predicate: query => query.isActive() && query.isStale() })

  const animate = async () => {
    await Promise.all([
      blinkAnimation('[data-added]', '#86efac'),
      blinkAnimation('[data-removed]', '#e2e8f0'),
    ])
  }

  animate()
}

async function blinkAnimation(selector: string, backgroundColor: string) {
  const listEl = document.getElementById('discoveredRulesList')
  if (!listEl) return
  listEl.querySelectorAll(selector).forEach(async (el) => {
    el.animate([
      { backgroundColor },
    ], {
      duration: 300,
      direction: 'alternate',
      iterations: 2,
    })
  })
}

const allRulesQuery = useActiveTaskRulesQuery({
  queryOptions: {
    enabled: activeTaskRulesQuery.isSuccess,
  },
})

const rulesNotInSelectedRules = computed(() => {
  return allRulesQuery.rules.value.filter(rule => !selectedRules.isRuleSelected(rule))
})
const isAnyNotInSelectedRules = computed(() => {
  return rulesNotInSelectedRules.value.length > 0
})

const isAddAllLoading = ref(false)
async function addAllToSelectedRules() {
  isAddAllLoading.value = true
  await addToSelectedRules(rulesNotInSelectedRules.value)
  isAddAllLoading.value = false
}
</script>
