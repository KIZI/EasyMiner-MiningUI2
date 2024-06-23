<template>
  <SelectionButtons
    v-if="shouldShowSelection"
    v-on="{
      selectAll,
      clear,
      invert,
    }"
  />
</template>

<script setup lang="ts">
import { useInjectAttributesList } from '@/components/Attributes/attributesListInjection'
import SelectionButtons from '@/components/Selection/SelectionButtons.vue'

const { selectionModel, shouldShowSelection } = useInjectAttributesList()!
const { selectAll, clear, invert } = selectionModel
</script>
