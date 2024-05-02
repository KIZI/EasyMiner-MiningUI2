<template>
  <SectionCard class="pb-5 pt-4 [&>*]:px-6">
    <div class="flex items-start justify-between">
      <div>
        <div class="flex items-center gap-x-3">
          <SectionTitle>
            <template v-if="state && isTaskStateRunning(state)">
              Task is in progress...
            </template>

            <template v-else-if="state === 'failed'">
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
            v-if="rules.length && isAnyUnselected"
            size="xs"
            variant="ghost"
            class="gap-x-1.5 font-medium"
            icon-class="text-green-700"
            :loading="addRulesMutation.isPending.value"
            @click="addAllToSelectedRules"
          >
            <template #icon>
              <icon-ph-checks class="size-5" />
            </template>
            Add all to Selected rules
          </VButton>
        </div>

        <div>
          <div class="text-lg text-primary-900">
            {{ task?.name }}
          </div>
        </div>
      </div>

      <div class="-mr-2 flex items-center gap-x-2">
        <VButton
          v-if="state && !isTaskStateRunning(state) && rules.length"
          variant="ghost"
          size="xs"
          class="shrink-0 gap-x-1.5"
          @click="loadTaskToRulePattern"
        >
          <icon-ph-arrow-up class="size-5" />
          Load task to rule pattern
        </VButton>

        <VButton
          v-if="state && !isTaskStateRunning(state)"
          variant="ghost"
          size="xs"
          class="shrink-0 gap-x-1.5"
          @click="clearActiveTask"
        >
          <icon-ph-clock-counter-clockwise class="size-5" />
          Tasks history
        </VButton>
      </div>
    </div>

    <template v-if="taskDetail && rules.length">
      <RulesFilters class="mt-8" />
      <div class="mt-3 divide-y divide-slate-100 border-y border-slate-200">
        <DiscoveredTaskRule
          v-for="(rule, i) in rules"
          :key="rule.text"
          v-model:selected="selection"
          :rule="rule"
          :task="taskDetail"
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
                <icon-ph-arrow-square-out class="size-4 text-gray-700" />
                Task detail
              </button>
              <button class="inline-flex items-center gap-x-2 text-xs hover:underline">
                <icon-ph-export class="size-4 text-gray-700" />
                Export task
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </SectionCard>
</template>

<script setup lang="ts">
import DiscoveredTaskRule from '@discoveredRules/components/DiscoveredTaskRule.vue'
import { computed, ref } from 'vue'
import { useRulePatternStore } from '@rulesMining/stores/rulePatternStore'
import { useSelectedRules } from '@selectedRules/composables/useSelectedRules'
import { useActiveTaskRulesQuery } from '@/api/tasks/useActiveTaskRulesQuery'
import { useActiveTaskDetailQuery } from '@/api/tasks/useActiveTaskDetailQuery'
import SectionCard from '@/components/Layout/SectionCard.vue'
import SectionTitle from '@/components/Layout/SectionTitle.vue'
import RulesFilters from '@/components/Rules/RulesFilters.vue'
import VButton from '@/components/VButton.vue'
import { useTasksStore } from '@/stores/tasksStore'
import RulesSelectionActions from '@/components/Rules/RulesSelectionActions.vue'
import VPagination from '@/components/VPagination.vue'
import type { TaskRule } from '@/api/tasks/types'
import { isTaskStateRunning } from '@/api/tasks/utils'

const rulePatternStore = useRulePatternStore()
const { rules, task, state } = useActiveTaskRulesQuery()
const { task: taskDetail } = useActiveTaskDetailQuery()
const { clearActiveTask } = useTasksStore()

const selection = ref<TaskRule[]>([])

function loadTaskToRulePattern() {
  if (!taskDetail.value) return
  rulePatternStore.loadTaskRule(taskDetail.value.settings.rule0)
  document.getElementById('rulesMining')?.scrollIntoView({ behavior: 'smooth' })
}

const { isRuleSelected, addRulesMutation, handleAdd } = useSelectedRules()

const isAnyUnselected = computed(() => {
  return rules.value.some(rule => !isRuleSelected(rule))
})
function addAllToSelectedRules() {
  handleAdd(rules.value.filter(rule => !isRuleSelected(rule)))
}
</script>
