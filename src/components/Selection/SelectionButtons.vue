<template>
  <div class="flex gap-x-0.5">
    <button
      title="Select all"
      @click="$emit('selectAll')"
    >
      <icon-fluent-shape-union-20-regular :width="25" />
    </button>
    <button
      title="Invert selection"
      @click="$emit('invertSelection')"
    >
      <icon-fluent-shape-intersect-20-regular :width="25" />
    </button>
    <button
      title="Select none"
      @click="$emit('clearSelection')"
    >
      <icon-fluent-square-20-regular :width="25" />
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits(['selectAll', 'clearSelection', 'invertSelection'])
</script>
