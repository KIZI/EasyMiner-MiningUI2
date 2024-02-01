<template>
  <VClearInput v-model="searchQuery">
    <VInput
      ref="inputRef"
      v-model="searchQuery"
      placeholder="Search by attribute name..."
      :disabled="!shouldShowSearch"
    />
  </VClearInput>
</template>

<script setup lang="ts">
import { ref, watchEffect, nextTick } from 'vue';
import VClearInput from '@/components/Form/VClearInput.vue';
import VInput from '@/components/Form/VInput.vue';
import { useInjectAttributesList } from '@/components/Attributes/attributesListInjection';

const { searchQuery, shouldShowSearch } = useInjectAttributesList()!;

const inputRef = ref<{$el: HTMLInputElement}>();

watchEffect(async () => {
  if (!shouldShowSearch.value) return;
  await nextTick();
  inputRef.value?.$el?.focus();
});
</script>
