<template>
  <div class="space-y-2">
    <div class="flex">
      <label
        for=""
        class="mr-2.5 self-center text-xs"
      >Page</label>
      <nav class="inline-flex -space-x-px rounded-md shadow-sm">
        <button
          class="
            relative inline-flex items-center space-x-1 rounded-l-md px-2 py-1 text-sm font-medium ring-1 ring-inset
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400
          "
          :disabled="isFirstPage"
          :class="{
            'text-gray-900 ring-gray-300 hover:bg-slate-100': !isFirstPage,
            'ring-gray-200 ': isFirstPage,
          }"
          @click="previousPage"
        >
          <icon-ph-caret-left-bold
            class="size-3"
            :class="{
              'text-gray-300': isFirstPage,
            }"
          />
        </button>

        <select
          v-model="currentPage"
          class="border-gray-300 bg-[right_0.2rem_center] px-2 py-0.5 pr-6 text-sm shadow-sm focus:border-blue-200 focus:ring-blue-400"
        >
          <option
            v-for="page in totalPages"
            :key="page"
            :value="page"
          >
            {{ page }}
          </option>
        </select>

        <button
          class="
            relative inline-flex items-center space-x-1 rounded-r-md px-2 py-1 text-sm font-medium ring-1 ring-inset
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400
          "
          :class="{
            'cursor-pointer text-gray-900 ring-gray-300 hover:bg-slate-100': !isLastPage,
          }"
          @click="nextPage"
        >
          <icon-ph-caret-right-bold
            class="size-3"
            :class="{
              'text-gray-300': isLastPage,
            }"
          />
        </button>
      </nav>

      <div class="ml-5 flex items-center gap-x-2">
        <select
          v-model="pageSize"
          class="rounded border-gray-300 bg-[right_0.2rem_center] px-2 py-1 pr-6 text-sm leading-none shadow-sm focus:border-blue-200 focus:ring-blue-200"
        >
          <option
            v-for="size in PAGE_SIZES"
            :key="size"
            :value="size"
          >
            {{ size }}
          </option>
        </select>
        <label
          for=""
          class="self-center text-2xs"
        >items per page</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PAGE_SIZES } from '@/api/pagination'

const props = withDefaults(defineProps<{
  totalPages?: number
}>(), {
  totalPages: 10,
})

const currentPage = defineModel<number>('page', { default: 1 })
const pageSize = defineModel<number>('pageSize')

const isFirstPage = computed(() => currentPage.value === 1)
const isLastPage = computed(() => currentPage.value === props.totalPages)

function nextPage() {
  if (isLastPage.value) return
  currentPage.value++
}

function previousPage() {
  if (isFirstPage.value) return
  currentPage.value--
}
</script>
