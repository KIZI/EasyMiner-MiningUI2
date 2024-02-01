<template>
  <div class="flex gap-x-0.5">
    <button
      title="Select all"
      @click="selectAll"
    >
      <icon-fluent-shape-union-20-regular :width="25" />
    </button>
    <button
      title="Invert selection"
      @click="invertSelection"
    >
      <icon-fluent-shape-intersect-20-regular :width="25" />
    </button>
    <button
      title="Select none"
      @click="clearSelection"
    >
      <icon-fluent-square-20-regular :width="25" />
    </button>
  </div>
</template>

<script setup lang="ts" generic="T">
import { useSelectionModel } from '@/composables/useSelectionModel';
import { toRefs } from 'vue';

const props = defineProps<{
  items: T[],
}>();
const { items } = toRefs(props);

const selection = defineModel<T[]>('selection', {
  default: [],
});

const {
  selectAll,
  invertSelection,
  clearSelection,
} = useSelectionModel({ items, modelValue: selection });
</script>
