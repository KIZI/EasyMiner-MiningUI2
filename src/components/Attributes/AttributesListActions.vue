<template>
  <VIconButton
    v-if="!disableSelection"
    :disabled="isSelectionDisabled"
    @click="toggleSelection"
  >
    <icon-fluent-select-all-24-regular
      :width="22"
      :class="{
        'text-primary-700': shouldShowSelection,
        'text-gray-300': isSelectionDisabled,
      }"
    />
  </VIconButton>
  <VIconButton @click="toggleSearch">
    <icon-ph-magnifying-glass
      :width="22"
      :class="{ 'text-primary-700': !!searchQuery }"
    />
  </VIconButton>
</template>

<script setup lang="ts">
import { useInjectAttributesList } from '@/components/Attributes/attributesListInjection'
import VIconButton from '@/components/VIconButton.vue'

defineProps<{
  noSelection?: boolean
}>()

const {
  disableSelection,
  isSelectionDisabled,
  shouldShowSelection,
  searchQuery,
  toggleSearch,
  toggleSelection,
} = useInjectAttributesList()!
</script>
