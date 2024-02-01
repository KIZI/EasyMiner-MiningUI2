<template>
  <span
    class="inline-flex rounded bg-slate-100 font-medium text-gray-800 transition-all"
    :class="{
      'gap-x-1 px-2 py-1 text-xs': sm,
      'gap-x-1.5 px-3 py-1.5 text-sm': !sm,
    }"
  >
    <span
      v-if="isNegated"
      class="text-2xl leading-[1rem]"
    >¬</span>
    {{ name }}
    <span
      v-if="fixedValue !== false"
      class="text-primary-700"
      :class="{
        'text-2xs': sm,
        'text-xs': !sm,
      }"
    >
      <template v-if="Array.isArray(fixedValue)">
        ([
        <span class="font-medium">{{ formatDecimal(fixedValue[0]) }}</span>;
        <span class="font-medium">{{ formatDecimal(fixedValue[1]) }}</span>
        ])
      </template>
      <template v-else>
        (<span class="font-medium">{{ formatFixedValue(fixedValue) }}</span>)
      </template>
    </span>
  </span>
</template>

<script lang="ts" setup>
import { formatFixedValue } from '@/features/rulesMining/utils/format';
import { formatDecimal } from '@/utils/format';

withDefaults(defineProps<{
  name: string,
  fixedValue?: string | number | [number, number] | false,
  isNegated?: boolean,
  sm?: boolean,
}>(), {
  fixedValue: false,
  isNegated: false,
  sm: false,
});
</script>
