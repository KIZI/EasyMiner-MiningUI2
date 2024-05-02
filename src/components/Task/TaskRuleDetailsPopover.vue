<template>
  <Popover
    as-tooltip
    class="inline-flex items-center"
  >
    <PopoverButton :as="VIconButton">
      <icon-ph-info class="size-5 text-gray-700" />
    </PopoverButton>

    <SlideTransition direction="left">
      <PopoverPanel class="absolute right-10 z-10">
        <div class="rounded-md bg-white py-1 pl-3.5 pr-5 shadow-lg ring-1 ring-black/5">
          <div class="grid w-max grid-cols-3 text-right text-2xs leading-4">
            <div class="col-start-2 pr-2">
              con.
            </div>
            <div class="flex justify-end gap-x-0.5">
              <span class="inline-flex h-4 items-center text-base">¬</span>
              con.
            </div>
            <div class="">
              ant.
            </div>
            <div class="pr-2 font-medium">
              {{ formatDecimal(rule.a) }}
            </div>
            <div class="font-medium">
              {{ formatDecimal(rule.b) }}
            </div>
            <div class="flex justify-end gap-x-0.5">
              <span class="inline-flex h-4 items-center text-base">¬</span>
              ant.
            </div>
            <div class="pr-2 font-medium">
              {{ formatDecimal(rule.c) }}
            </div>
            <div class="font-medium">
              {{ formatDecimal(rule.d) }}
            </div>
          </div>
        </div>
      </PopoverPanel>
    </SlideTransition>
  </Popover>
</template>

<script setup lang="ts">
import VIconButton from '@/components/VIconButton.vue'
import { Popover, PopoverButton, PopoverPanel } from '@/components/Popover'
import SlideTransition from '@/components/Transitions/SlideTransition.vue'
import type { TaskRule } from '@/api/tasks/types'
import { formatDecimal } from '@/utils/format'

defineProps<{
  rule: TaskRule
}>()
</script>
