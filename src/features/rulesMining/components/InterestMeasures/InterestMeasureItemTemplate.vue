<template>
  <component
    :is="asButton ? 'button' : 'span'"
    class="inline-flex h-8 min-w-max shrink-0 items-center gap-x-1.5 rounded border-blue-100 bg-blue-100 px-3 text-sm font-medium text-gray-800 disabled:opacity-90"
    :class="{
      'enabled:hover:bg-blue-200': asButton,
    }"
  >
    <slot name="label">
      <span v-if="item">
        {{ $t(`interestMeasures.${item.name}.name`) }}
      </span>
    </slot>

    <slot name="value">
      <span
        v-if="item && item.type !== 'Boolean'"
        class="rounded text-center font-semibold"
      >{{ item?.value }}</span>
    </slot>
  </component>
</template>

<script setup lang="ts">
import type { InterestMeasureActiveItem, InterestMeasureConfig } from '@rulesMining/types/interestMeasure.types'

defineProps<{
  item?: InterestMeasureActiveItem
  asButton?: boolean
}>()
</script>
