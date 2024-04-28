<template>
  <button
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
  </button>
  <button @click="toggleSearch">
    <icon-ph-magnifying-glass
      :width="22"
      :class="{ 'text-primary-700': !!searchQuery }"
    />
  </button>
</template>

<script setup lang="ts">
import { useInjectAttributesList } from '@/components/Attributes/attributesListInjection'

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
