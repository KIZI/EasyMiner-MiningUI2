<template>
  <SelectionButtons
    v-if="shouldShowSelection"
    v-on="{
      selectAll,
      clearSelection,
      invertSelection,
    }"
  />
</template>

<script setup lang="ts">
import { useInjectAttributesList } from '@/components/Attributes/attributesListInjection'
import SelectionButtons from '@/components/Selection/SelectionButtons.vue'

const { selection, shouldShowSelection } = useInjectAttributesList()!
const { selectAll, clearSelection, invertSelection } = selection
</script>
