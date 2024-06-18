<template>
  <div v-if="!isLoading && (hasRules || isDataParamsTouched) && !!dataParams" class="mt-7 peer-px">
    <div class="flex items-center gap-x-4">
      <div class="flex items-center gap-x-2">
        <span class="text-xs">Order by:</span>
        <select
          v-model="dataParams.order.orderBy"
          class="rounded border-gray-300 bg-[right_0.2rem_center] px-2 py-0.5 pr-7 text-xs font-medium leading-normal shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option v-for="size in taskRulesOrderOptions" :key="size.value" :value="size.value">
            {{ size.label }}
          </option>
        </select>
        <select
          v-model="dataParams.order.order"
          class="rounded border-gray-300 bg-[right_0.2rem_center] px-2 py-0.5 pr-7 text-xs font-medium leading-normal shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option v-for="orderOption in orderOptions" :key="orderOption.value" :value="orderOption.value">
            {{ orderOption.label }}
          </option>
        </select>
      </div>
      <div class="flex h-7 grow items-center">
        <VButton variant="ghost" size="sm" class="mr-0.5 shrink-0 gap-x-2 text-xs" @click="showSearch = !showSearch">
          <template #icon>
            <icon-ph-magnifying-glass class="size-4 text-slate-900" />
          </template>
          <template v-if="!showSearch">
            Search rules
          </template>
        </VButton>
        <template v-if="showSearch">
          <div class="relative flex w-full items-center">
            <VInput v-model="dataParams.filters.antecedent" class="h-7 pl-2 pr-6 text-xs" placeholder="Antecedent" />
            <button class="absolute right-2" @click="dataParams.filters.antecedent = ''">
              <icon-ph-x class="size-3.5 text-slate-700" />
            </button>
          </div>
          <div class="mx-2.5 text-lg">
            →
          </div>
          <div class="relative flex w-full items-center">
            <VInput v-model="dataParams.filters.consequent" class="h-7 pl-2 pr-6 text-xs" placeholder="Consequent" />
            <button class="absolute right-2" @click="dataParams.filters.consequent = ''">
              <icon-ph-x class="size-3.5 text-slate-700" />
            </button>
          </div>
        </template>
      </div>
    </div>
    <div class="mt-4 flex items-center gap-x-4">
      <div class="flex items-center gap-x-2">
        <span class="text-xs font-medium">Confidence:</span>
        <div class="flex items-center gap-1">
          <VInput
            v-model="dataParams.filters.confidence.from" v-maska data-maska="W.##"
            data-maska-tokens="W:[0-1]:optional" placeholder="0"
            class="h-6 w-10 p-0 text-center text-xs font-medium leading-none"
          />
          <span class="font-semibold text-gray-700">;</span>
          <VInput
            v-model="dataParams.filters.confidence.to" v-maska data-maska="W.##"
            data-maska-tokens="W:[0-1]:optional" placeholder="1"
            class="h-6 w-10 p-0 text-center text-xs font-medium leading-none"
          />
        </div>
      </div>
      <div class="flex items-center gap-x-2">
        <span class="text-xs font-medium">Support:</span>
        <div class="flex items-center gap-1">
          <VInput
            v-model="dataParams.filters.support.from" v-maska data-maska="W.##"
            data-maska-tokens="W:[0-1]:optional" placeholder="0"
            class="h-6 w-10 p-0 text-center text-xs font-medium leading-none"
          />
          <span class="font-semibold text-gray-700">;</span>
          <VInput
            v-model="dataParams.filters.support.to" v-maska data-maska="W.##" data-maska-tokens="W:[0-1]:optional"
            placeholder="1" class="h-6 w-10 p-0 text-center text-xs font-medium leading-none"
          />
        </div>
      </div>
      <div class="flex items-center gap-x-2">
        <span class="text-xs font-medium">Lift:</span>
        <div class="flex items-center gap-1">
          <VInput
            v-model="dataParams.filters.lift.from" v-maska data-maska="##.##" placeholder="0"
            class="h-6 w-10 p-0 text-center text-xs font-medium leading-none"
          />
          <span class="font-semibold text-gray-700">;</span>
          <VInput
            v-model="dataParams.filters.lift.to" v-maska data-maska="#N.##" data-maska-tokens="N:[0-9]:optional"
            placeholder="∞" class="h-6 w-10 p-0 text-center text-xs font-medium leading-none"
          />
        </div>
      </div>
    </div>
  </div>

  <div v-if="!isLoading && !hasRules" class="grid h-full place-items-center text-gray-700">
    <slot v-if="!isDataParamsTouched" name="empty" />
    <div v-else class="flex flex-col items-center gap-y-4">
      <div class="flex gap-x-3">
        <icon-ph-info class="size-6" />
        No results.
      </div>
      <div class="text-sm">
        Try to change the search criteria or <button class="underline hover:no-underline" @click="resetFilters">
          clear the filters
        </button>.
      </div>
    </div>
  </div>

  <div
    v-else ref="containerRef"
    class="relative mt-3 min-h-40 grow overflow-y-auto overflow-x-hidden border-y border-slate-200 px-0"
  >
    <BlockSpinner v-if="isLoading || isRefetching" :darken="!isLoading && isRefetching" />
    <div class="divide-y divide-slate-100">
      <template v-if="!isLoading">
        <ListTransitionGroup :disabled="!animate">
          <div v-for="(rule, i) in rules" :key="rule.id">
            <TaskRuleComponent v-model:selected="selection" :rule="rule" :task="task" :is-odd="i % 2 > 0">
              <template #actions>
                <slot name="ruleActions" :rule="rule" />
              </template>
            </TaskRuleComponent>
          </div>
        </ListTransitionGroup>
      </template>
    </div>
  </div>

  <div class="-ml-2 min-h-12 pt-4 peer-px">
    <div v-if="!isLoading && hasRules" class="grid grid-cols-[1fr_auto_1fr] items-center">
      <RulesSelectionActions v-model:selection="selection" :rules="rules" />
      <div class="mx-auto">
        <VPagination v-bind="pagination.bindings.value" />
      </div>
      <div class="ml-auto">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ModelRef, computed, reactive, ref, toRef, toRefs } from 'vue'
import { vMaska } from 'maska'
import BlockSpinner from '@/components/BlockSpinner.vue'
import VPagination from '@/components/VPagination.vue'
import RulesSelectionActions from '@/components/Rules/RulesSelectionActions.vue'
import VInput from '@/components/Form/VInput.vue'
import VButton from '@/components/VButton.vue'
import TaskRuleComponent from '@/components/Task/TaskRule.vue'
import type { TaskRule, TaskWithSettings } from '@/api/tasks/types'
import ListTransitionGroup from '@/components/Transitions/ListTransitionGroup.vue'
import { usePagination } from '@/api/pagination'
import { type TaskRulesDataParams, createTaskRulesDataParams, isTaskRulesDataParamsTouched, orderOptions, taskRulesOrderOptions } from '@/components/Task/taskRulesDataParams'

const props = defineProps<{
  task?: TaskWithSettings
  rules: TaskRule[]
  isLoading?: boolean
  isRefetching?: boolean
  animate?: boolean
  totalCount?: number
}>()

const dataParams = defineModel('dataParams') as ModelRef<TaskRulesDataParams>

function resetFilters() {
  const defaultDataParams = createTaskRulesDataParams()
  dataParams.value.filters = defaultDataParams.filters
  dataParams.value.pagination = defaultDataParams.pagination
}

const isDataParamsTouched = computed(() => {
  return isTaskRulesDataParamsTouched(dataParams.value)
})

const pagination = usePagination({
  state: toRef(dataParams.value, 'pagination'),
  totalCount: toRef(props, 'totalCount', 0),
})

const hasRules = computed(() => !!props.rules.length)
const selection = ref<TaskRule[]>([])
const containerRef = ref<HTMLElement>()

const showSearch = ref(false)
</script>
