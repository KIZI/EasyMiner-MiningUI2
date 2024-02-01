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
        >
          <icon-ph-caret-left-bold
            class="h-3 w-3"
            :class="{
              'text-gray-300': isFirstPage,
            }"
          />
        </button>

        <select
          :value="currentPage"
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
        >
          <icon-ph-caret-right-bold
            class="h-3 w-3"
            :class="{
              'text-gray-300': isLastPage,
            }"
          />
        </button>
      </nav>

      <div class="ml-5 flex items-center gap-x-2">
        <select
          v-model="pageSizeModel"
          class="rounded border-gray-300 bg-[right_0.2rem_center] px-2 py-1 pr-6 text-sm leading-none shadow-sm focus:border-blue-200 focus:ring-blue-200"
        >
          <option
            v-for="size in pageSizeOptions"
            :key="size.value"
            :value="size.value"
          >
            {{ size.label }}
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
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<{
  totalPages?: number,
  currentPage: number,
  offset?: number,
  pageSize?: number,
}>(), {
  currentPage: 1,
  offset: 2,
  pageSize: 10,
  totalPages: 0,
});

const options = computed(() => [...Array(props.totalPages)].map((_, i) => ({
  label: `${i + 1}`,
  value: i + 1,
})));

const pageSizeModel = ref(props.pageSize);
const pageSizeOptions = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
];

function getMinPreviousPage(page: number) {
  return Math.max(2, page);
}

function getMaxNextPage(page: number) {
  return Math.min(props.totalPages - 1, page);
}

const pages = computed(() => {
  const expectedStartPage = props.currentPage - props.offset;
  const expectedEndPage = props.currentPage + props.offset;

  const possibleStartPage = getMinPreviousPage(expectedStartPage);
  const possibleEndPage = getMaxNextPage(expectedEndPage);

  const startPageDelta = Math.abs(possibleStartPage - expectedStartPage);
  const endPageDelta = Math.abs(possibleEndPage - expectedEndPage);

  const startPage = getMinPreviousPage(possibleStartPage - endPageDelta);
  const endPage = getMaxNextPage(possibleEndPage + startPageDelta);

  return [...Array(endPage - startPage + 1)].map((_, i) => i + startPage);
});

const previousPage = computed(() => getMinPreviousPage(props.currentPage - 1));
const nextPage = computed(() => getMaxNextPage(props.currentPage + 1));

const hasPreviousPage = computed(() => props.currentPage > previousPage.value);
const hasNextPage = computed(() => props.currentPage < nextPage.value);

const isFirstPage = computed(() => props.currentPage === 1);
const isLastPage = computed(() => props.currentPage === props.totalPages);
</script>
