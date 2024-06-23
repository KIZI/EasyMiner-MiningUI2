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
          @click="previous"
        >
          <icon-ph-caret-left-bold
            class="size-3"
            :class="{
              'text-gray-300': isFirstPage,
            }"
          />
        </button>

        <select
          v-model="currentPageModel"
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
          :disabled="isLastPage"
          :class="{
            'text-gray-900 ring-gray-300 hover:bg-slate-100': !isLastPage,
            'ring-gray-200': isLastPage,
          }"
          @click="next"
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
          v-model="pageSizeModel"
          class="rounded border-gray-300 bg-[right_0.2rem_center] px-2 py-1 pr-6 text-sm leading-none shadow-sm focus:border-blue-400 focus:ring-blue-400"
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
import { computed, toRef, toRefs } from 'vue'
import { PAGE_SIZES, type Pagination } from './usePagination'

const props = defineProps<{ pagination: Pagination }>()

const { isFirstPage, isLastPage, next, previous, totalPages } = toRefs(props.pagination)
const { setPage, setPageSize, state } = props.pagination

const pageSizeModel = computed({
  get() {
    return state.pageSize
  },
  set(value: number) {
    setPageSize(value)
  },
})

const currentPageModel = computed({
  get() {
    return state.page
  },
  set(value: number) {
    setPage(value)
  },
})
</script>
