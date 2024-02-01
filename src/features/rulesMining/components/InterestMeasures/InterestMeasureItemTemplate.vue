<template>
  <component
    :is="as ?? 'span'"
    class="relative inline-flex h-8 min-w-[max-content] shrink-0 items-center gap-x-1.5 rounded border-blue-100 bg-blue-100 px-3 text-sm font-medium text-gray-800"
  >
    <slot name="label">
      <span>
        {{ item?.label }}:
      </span>
    </slot>

    <slot name="value">
      <span class="rounded text-center font-semibold">{{ item?.value }}</span>
    </slot>
  </component>
</template>

<script setup lang="ts">
import type { InterestMeasureItem } from '@rulesMining/types/interestMeasure.types';

defineProps<{
  item?: InterestMeasureItem,
  as?: string,
}>();
</script>
