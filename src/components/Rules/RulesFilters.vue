<template>
  <div class="">
    <div class="-mt-3 pb-3">
      <div class="relative top-3 z-30 flex items-center">
        <div class="flex items-center gap-x-0">
          <span class="bg-white pr-2 text-xs">Order by:</span>
          <select
            v-model="order"
            class="rounded border-slate-300 bg-[right_0.2rem_center] px-2 py-0.5 pr-7 text-xs font-medium leading-normal shadow-sm focus:border-blue-200 focus:ring-blue-200"
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

        <div class="ml-6 w-36">
          <button
            class="items-center rounded border px-2 py-0.5 text-xs font-medium"
            :class="{
              'border-transparent': expanded,
              'border-slate-300 hover:bg-slate-50': !expanded,
            }"
            @click="expanded = !expanded"
          >
            <div
              class="flex items-center pl-0.5"
              :class="{
                'bg-white pr-2': expanded,
                'pr-1': !expanded,
                'text-primary-700': isFilteringActive,
              }"
            >
              <component
                :is="isFilteringActive ? IconPhFunnelFill : IconPhFunnel"
                class="mr-2"
                :class="{
                  'text-gray-700': !isFilteringActive,
                }"
              />
              <span
                :class="{
                  '': isFilteringActive,
                }"
              >Filters</span>

              <div class="ml-2.5 flex items-center space-x-2">
                <button
                  v-if="isFilteringActive"
                  @click.stop="resetFilters"
                >
                  <icon-ph-x class="size-3.5 text-gray-700" />
                </button>
                <span class="text-gray-500">
                  <component
                    :is="expanded ? IconPhCaretUpBold : IconPhCaretDownBold"
                    class="size-3.5"
                  />
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div
        v-if="expanded"
        class="rounded border border-slate-300 px-4 py-5"
      >
        <div class="mt-1.5 grid grid-cols-3 gap-x-10">
          <div class="flex items-center gap-x-2">
            <span class="text-xs font-medium">Confidence:</span>
            <VSliderWithControls
              v-model="filters.confidence"
              class="w-full max-w-60"
              :min="0"
              :max="100"
              :step="5"
            />
          </div>
          <div class="flex items-center gap-x-2">
            <span class="text-xs font-medium">Support:</span>
            <VSliderWithControls
              v-model="filters.support"
              :min="0"
              :max="100"
              :step="5"
              class="w-full max-w-60"
            />
          </div>
          <div class="flex items-center gap-x-2">
            <span class="text-xs font-medium">Lift:</span>
            <VSliderWithControls
              v-model="filters.lift"
              :min="0"
              :max="5"
              class="w-full max-w-60"
            />
          </div>

          <hr class="col-span-3 mt-4 border-slate-200 pt-3.5">

          <CedentFilter
            v-model="filters.antecedent"
            label="Antecedent"
          />
          <CedentFilter
            v-model="filters.consequent"
            label="Consequent"
          />
          <CedentFilter
            v-model="filters.anyCedent"
            label="Any cedent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isEqual } from 'lodash-es'
import { computed, reactive, ref } from 'vue'
import CedentFilter from '@/components/Rules/CedentFilter.vue'
import VSliderWithControls from '@/components/Form/VSliderWithControls.vue'
import IconPhCaretDownBold from '~icons/ph/caret-down-bold'
import IconPhCaretUpBold from '~icons/ph/caret-up-bold'
import IconPhFunnel from '~icons/ph/funnel'
import IconPhFunnelFill from '~icons/ph/funnel-fill'

const expanded = ref(false)
const order = ref('found')

function createFilters() {
  return {
    antecedent: new Map(),
    consequent: new Map(),
    anyCedent: new Map(),
    confidence: [0, 100],
    lift: [0, 5],
    support: [0, 100],
  }
}

const defaultFilters = createFilters()
const filters = reactive(createFilters())

function resetFilters() {
  Object.assign(filters, createFilters())
}

type FilterKey = keyof typeof filters
type FilterValue = typeof filters[FilterKey]

const isFilteringActive = computed(() => {
  const filtersEntries = Object.entries(filters) as [FilterKey, FilterValue][]

  return filtersEntries.some(([key, filter]) => {
    const defaultFilter = defaultFilters[key]
    return !isEqual(filter, defaultFilter)
  })
})

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
  {
    label: 'Custom order',
    value: 'custom',
  },
]
</script>

<style scoped>

</style>
