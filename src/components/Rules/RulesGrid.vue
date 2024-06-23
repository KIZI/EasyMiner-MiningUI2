<template>
  <div v-if="!isLoading && (hasRules || isAnyFilterActive)" class="mt-7 peer-px">
    <div class="flex items-center gap-x-4">
      <div class="flex items-center gap-x-2">
        <span class="text-xs">Order by:</span>
        <select
          v-model="order.orderBy"
          class="rounded border-gray-300 bg-[right_0.2rem_center] px-2 py-0.5 pr-7 text-xs font-medium leading-normal shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option v-for="size in taskRulesOrderOptions" :key="size.value" :value="size.value">
            {{ size.label }}
          </option>
        </select>
        <select
          v-model="order.order"
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
            <HLDebounce v-model="filters.antecedent" #="{debouncedModel}">
              <VClearInput v-model="filters.antecedent">
                <VInput v-model="debouncedModel.value" class="h-7 pl-2 pr-8 text-xs" placeholder="Antecedent" />
              </VClearInput>
            </HLDebounce>
          </div>
          <div class="mx-2.5 text-lg">
            →
          </div>
          <div class="relative flex w-full items-center">
            <HLDebounce v-model="filters.consequent" #="{debouncedModel}">
              <VClearInput v-model="filters.consequent">
                <VInput v-model="debouncedModel.value" class="h-7 pl-2 pr-8 text-xs" placeholder="Consequent" />
              </VClearInput>
            </HLDebounce>
          </div>
        </template>
      </div>
    </div>

    <div v-if="rulesGrid.options.filterByMeasures" class="mt-4 flex items-center gap-x-4">
      <div class="flex items-center gap-x-2">
        <span class="text-xs font-medium">Confidence:</span>
        <div class="flex items-center gap-1">
          <HLDebounce v-model="filters.confidence.from" #="{debouncedModel}">
            <VInput
              v-model="debouncedModel.value"
              v-maska data-maska="W.##"
              data-maska-tokens="W:[0-1]:optional" placeholder="0"
              class="h-6 w-10 p-0 text-center text-xs font-medium leading-none"
            />
          </HLDebounce>
          <span class="font-semibold text-gray-700">;</span>
          <HLDebounce v-model="filters.confidence.to" #="{debouncedModel}">
            <VInput
              v-model="debouncedModel.value" v-maska data-maska="W.##"
              data-maska-tokens="W:[0-1]:optional" placeholder="1"
              class="h-6 w-10 p-0 text-center text-xs font-medium leading-none"
            />
          </HLDebounce>
        </div>
      </div>
      <div class="flex items-center gap-x-2">
        <span class="text-xs font-medium">Support:</span>
        <div class="flex items-center gap-1">
          <HLDebounce v-model="filters.support.from" #="{debouncedModel}">
            <VInput
              v-model="debouncedModel.value" v-maska data-maska="W.##"
              data-maska-tokens="W:[0-1]:optional" placeholder="0"
              class="h-6 w-10 p-0 text-center text-xs font-medium leading-none"
            />
          </HLDebounce>
          <span class="font-semibold text-gray-700">;</span>
          <HLDebounce v-model="filters.support.to" #="{debouncedModel}">
            <VInput
              v-model="debouncedModel.value" v-maska data-maska="W.##" data-maska-tokens="W:[0-1]:optional"
              placeholder="1" class="h-6 w-10 p-0 text-center text-xs font-medium leading-none"
            />
          </HLDebounce>
        </div>
      </div>
      <div class="flex items-center gap-x-2">
        <span class="text-xs font-medium">Lift:</span>
        <div class="flex items-center gap-1">
          <HLDebounce v-model="filters.lift.from" #="{debouncedModel}">
            <VInput
              v-model="debouncedModel.value" v-maska data-maska="##.##" placeholder="0"
              class="h-6 w-10 p-0 text-center text-xs font-medium leading-none"
            />
          </HLDebounce>
          <span class="font-semibold text-gray-700">;</span>
          <HLDebounce v-model="filters.lift.to" #="{debouncedModel}">
            <VInput
              v-model="debouncedModel.value" v-maska data-maska="#N.##" data-maska-tokens="N:[0-9]:optional"
              placeholder="∞" class="h-6 w-10 p-0 text-center text-xs font-medium leading-none"
            />
          </HLDebounce>
        </div>
      </div>
    </div>
  </div>

  <div v-if="!isLoading && !hasRules" class="grid h-full place-items-center text-gray-700">
    <slot v-if="!isAnyFilterActive" name="empty" />
    <div v-else class="flex flex-col items-center gap-y-4">
      <div class="flex gap-x-3">
        <icon-ph-info class="size-6" />
        No results.
      </div>
      <div class="text-sm">
        Try to change or <button class="underline hover:no-underline" @click="resetFilters">
          clear filters
        </button>.
      </div>
    </div>
  </div>

  <div
    v-else
    :id="listId"
    class="relative mt-3 min-h-40 grow overflow-x-hidden overflow-y-scroll border-y border-slate-200 px-0"
  >
    <div class="relative min-h-full">
      <BlockSpinner v-if="isLoading || isRefetching" :darken="!isLoading && isRefetching" />
      <div class="">
        <template v-if="!isLoading">
          <TransitionGroup v-bind="transitionGroup">
            <template v-for="(rule, i) in rules" :key="rule.id">
              <RulesGridItem
                v-bind="getItemProps(rule)"
                :rule="rule"
                :task="task"
                :is-odd="i % 2 > 0"
                :highlight-in-selected-rules="highlightInSelectedRules"
                class="border-b"
                :class="i < rules.length - 1 ? 'border-b-slate-100' : 'border-transparent'"
              >
                <template #actions>
                  <slot name="ruleActions" :rule="rule" />
                </template>
              </RulesGridItem>
            </template>
          </TransitionGroup>
        </template>
      </div>
    </div>
  </div>

  <div class="-ml-2 min-h-12 pt-4 peer-px">
    <div v-if="!isLoading && hasRules" class="grid grid-cols-[1fr_auto_1fr] items-center">
      <RulesSelectionActions v-model:selection="selection" :rules="rules" />
      <div class="mx-auto">
        <VPagination :pagination="pagination" />
      </div>
      <div class="ml-auto">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Component, type TransitionGroupProps, computed, ref, toRefs, watch } from 'vue'
import { vMaska } from 'maska'
import { injectRulesGrid, orderOptions, taskRulesOrderOptions } from './rulesGrid'
import BlockSpinner from '@/components/BlockSpinner.vue'
import VPagination from '@/components/Pagination/VPagination.vue'
import RulesSelectionActions from '@/components/Rules/RulesSelectionActions.vue'
import { HLDebounce, VClearInput, VInput } from '@/components/Form'
import VButton from '@/components/VButton.vue'
import RulesGridItem from '@/components/Rules/RulesGridItem.vue'
import type { TaskWithSettings } from '@/api/tasks/types'

defineProps<{
  task?: TaskWithSettings
  highlightInSelectedRules?: boolean
  listId?: string
}>()

const rulesGrid = injectRulesGrid()!
const {
  uiState,
  dataState,
  filters,
  pagination,
  selection,
  order,
  isAnyFilterActive,
  hasRules,
  resetFilters,
} = rulesGrid

const { isLoading, isRefetching, rules } = toRefs(dataState)
const { transitionGroup, getItemProps } = toRefs(uiState)

const showSearch = ref(false)
</script>
