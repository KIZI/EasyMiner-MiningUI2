<template>
  <div class="flex">
    <VIconButton
      title="Select all"
      @click="$emit('selectAll')"
    >
      <icon-fluent-shape-union-20-regular :width="25" />
    </VIconButton>
    <VIconButton
      title="Invert selection"
      @click="$emit('invertSelection')"
    >
      <icon-fluent-shape-intersect-20-regular :width="25" />
    </VIconButton>
    <VIconButton
      title="Select none"
      @click="$emit('clearSelection')"
    >
      <icon-fluent-square-20-regular :width="25" />
    </VIconButton>
  </div>
</template>

<script setup lang="ts">
import VIconButton from '@/components/VIconButton.vue'

defineEmits(['selectAll', 'clearSelection', 'invertSelection'])
</script>
