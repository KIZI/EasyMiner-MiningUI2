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
      class="text-2xl leading-4"
    >¬</span>
    <Truncate
      :length="appConfig.truncateLength.attribute"
      :text="name"
    />
    <span
      class="text-primary-700"
      :class="{
        'text-2xs': sm,
        'text-xs': !sm,
      }"
    >
      (<span class="font-medium">{{ formatFixedValue(fixedValue) }}</span>)
    </span>
  </span>
</template>

<script lang="ts" setup>
import Truncate from '@/components/Truncate.vue'
import { appConfig } from '@/config/appConfig'
import { formatFixedValue } from '@/features/rulesMining/utils/format'

withDefaults(defineProps<{
  name: string
  fixedValue?: string | number
  isNegated?: boolean
  sm?: boolean
}>(), {
  fixedValue: undefined,
  isNegated: false,
  sm: false,
})
</script>
