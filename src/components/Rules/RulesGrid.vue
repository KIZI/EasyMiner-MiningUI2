<template>
  <div
    v-if="!isLoading && !hasRules"
    class="grid h-full place-items-center text-gray-600"
  >
    <slot name="empty" />
  </div>

  <template v-else>
    <div v-if="hasRules && filters" class="mt-7 flex items-center gap-x-6 peer-px">
      <div class="flex items-center gap-x-2">
        <span class="text-xs">Order by:</span>
        <select
          v-model="filters.orderBy"
          class="rounded border-gray-300 bg-[right_0.2rem_center] px-2 py-0.5 pr-7 text-xs font-medium leading-normal shadow-sm focus:border-blue-200 focus:ring-blue-200"
        >
          <option
            v-for="size in orderOptions"
            :key="size.value"
            :value="size.value"
          >
            {{ size.label }}
          </option>
        </select>
      </div>

      <div class="flex h-7 grow items-center">
        <VButton
          variant="ghost"
          size="sm"
          class="mr-2 shrink-0 gap-x-2 text-xs"
          @click="showSearch = !showSearch"
        >
          <template #icon>
            <icon-ph-magnifying-glass class="size-4 text-slate-900" />
          </template>
          <template v-if="!showSearch">
            Search rules
          </template>
        </VButton>

        <template v-if="showSearch">
          <div class="relative flex w-full items-center">
            <VInput
              v-model="filters.antecedent"
              class="h-7 pl-2 pr-6 text-xs"
              placeholder="Antecedent"
            />
            <button class="absolute right-2" @click="filters.antecedent = ''">
              <icon-ph-x class="size-3.5 text-slate-700" />
            </button>
          </div>
          <div class="mx-2.5 text-lg">
            →
          </div>
          <div class="relative flex w-full items-center">
            <VInput
              v-model="filters.consequent"
              class="h-7 pl-2 pr-6 text-xs"
              placeholder="Consequent"
            />
            <button class="absolute right-2" @click="filters.consequent = ''">
              <icon-ph-x class="size-3.5 text-slate-700" />
            </button>
          </div>
        </template>
      </div>
    </div>

    <div
      ref="containerRef"
      class="relative mt-3 min-h-40 grow overflow-y-auto overflow-x-hidden border-y border-slate-200 px-0"
    >
      <BlockSpinner v-if="isLoading" :darken="isRefetching" />
      <div class="divide-y divide-slate-100">
        <ListTransitionGroup>
          <div
            v-for="(rule, i) in rules"
            :key="rule.id"
          >
            <TaskRuleComponent
              v-model:selected="selection"
              :rule="rule"
              :is-odd="i % 2 > 0"
            >
              <template #actions>
                <slot name="ruleActions" :rule="rule" />
              </template>
            </TaskRuleComponent>
          </div>
        </ListTransitionGroup>
      </div>
    </div>

    <div class="-ml-2 min-h-12 pt-4 peer-px">
      <div v-if="hasRules" class="grid grid-cols-[1fr_auto_1fr] items-center">
        <RulesSelectionActions
          v-model:selection="selection"
          :rules="rules"
        />
        <div class="mx-auto">
          <VPagination v-bind="pagination.bindings" />
        </div>
        <div class="ml-auto">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BlockSpinner from '@/components/BlockSpinner.vue'
import VPagination from '@/components/VPagination.vue'
import RulesSelectionActions from '@/components/Rules/RulesSelectionActions.vue'
import VInput from '@/components/Form/VInput.vue'
import VButton from '@/components/VButton.vue'
import TaskRuleComponent from '@/components/Task/TaskRule.vue'
import type { TaskRule } from '@/api/tasks/types'
import ListTransitionGroup from '@/components/Transitions/ListTransitionGroup.vue'
import { usePagination } from '@/api/pagination'
import type { TaskRulesFilters } from '@/components/Task/taskRulesFilters'

const props = defineProps<{
  rules: TaskRule[]
  isLoading?: boolean
  isRefetching?: boolean
}>()

const filters = defineModel<TaskRulesFilters>('filters')
const pagination = usePagination({ state: filters.value?.pagination })

const hasRules = computed(() => !!props.rules.length)
const selection = ref<TaskRule[]>([])
const containerRef = ref<HTMLElement>()

const showSearch = ref(false)
const orderOptions = [
  {
    label: 'Found order',
    value: 'found',
  },
  {
    label: 'Confidence',
    value: 'confidence',
  },
  {
    label: 'Support',
    value: 'support',
  },
]
</script>