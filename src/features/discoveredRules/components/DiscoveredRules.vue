<template>
  <SectionCard class="py-4 group-px-6">
    <div class="flex min-h-16 items-start justify-between peer-px">
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
            :loading="isAddAllLoading"
            @click="addAllToSelectedRules"
          >
            <template #icon>
              <icon-ph-checks class="size-5" />
            </template>
            Add all to Selected rules
          </VButton>
        </div>

        <div class="mt-1 text-lg font-medium text-primary-900">
          {{ task?.name }}
        </div>
      </div>

      <div class="-mr-2 flex items-center gap-x-2">
        <VButton
          v-if="state && !isTaskStateRunning(state)"
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
      v-model:filters="filters"
      :rules="rules"
      :is-loading="isRulesLoading"
      :is-refetching="isRulesFetching"
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
import { computed, ref } from 'vue'
import { useRulePatternStore } from '@rulesMining/stores/rulePatternStore'
import { useSelectedRules } from '@selectedRules/composables/useSelectedRules'
import { useActiveTaskRulesQuery } from '@/api/tasks/useActiveTaskRulesQuery'
import { useActiveTaskDetailQuery } from '@/api/tasks/useActiveTaskDetailQuery'
import SectionCard from '@/components/Layout/SectionCard.vue'
import SectionTitle from '@/components/Layout/SectionTitle.vue'
import VButton from '@/components/VButton.vue'
import { isTaskStateRunning } from '@/api/tasks/utils'
import VIconButton from '@/components/VIconButton.vue'
import IconPhCheckCircle from '~icons/ph/check-circle.vue'
import IconPhCheckCircleFill from '~icons/ph/check-circle-fill.vue'
import RulesGrid from '@/components/Rules/RulesGrid.vue'
import { createTaskRulesFilters } from '@/components/Task/taskRulesFilters'

const filters = createTaskRulesFilters()
const rulePatternStore = useRulePatternStore()

const {
  rules,
  task,
  state,
  isLoading: isRulesLoading,
  isFetching: isRulesFetching,
} = useActiveTaskRulesQuery()

const { task: taskDetail } = useActiveTaskDetailQuery()

function loadTaskToRulePattern() {
  if (!taskDetail.value) return
  rulePatternStore.loadTaskRule(taskDetail.value.settings.rule0)
  document.getElementById('rulesMining')?.scrollIntoView({ behavior: 'smooth' })
}

const selectedRules = useSelectedRules()

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
