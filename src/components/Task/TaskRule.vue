<template>
  <div class="flex items-start pb-3.5 pt-2.5">
    <div class="relative space-y-0.5 pl-7">
      <label class="tracking-wid text-sm font-medium leading-relaxed">
        <VCheckbox
          v-model="selected"
          :value="rule"
          class="absolute left-0 mt-1.5 size-4"
        />

        <span class="cursor-pointer">{{ rule.text }}</span>
      </label>

      <div class="space-x-5 text-xs leading-none">
        <span>
          Confidence:
          <span class="font-semibold text-primary-700">
            {{ formatDecimal(rule.confidence) }}
          </span>
        </span>
        <span>
          Support:
          <span class="font-semibold text-primary-700">
            {{ formatDecimal(rule.support) }}
          </span>
        </span>
        <span>
          Lift:
          <span class="font-semibold text-primary-700">
            {{ formatDecimal(rule.lift) }}
          </span>
        </span>
      </div>
    </div>

    <div class="ml-auto mt-0.5 flex shrink-0 items-center space-x-3">
      <TaskRuleDetailsPopover :rule="rule" />

      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaskRule } from '@/api/tasks/types'
import VCheckbox from '@/components/Form/VCheckbox.vue'
import { formatDecimal } from '@/utils/format'
import TaskRuleDetailsPopover from '@/components/Task/TaskRuleDetailsPopover.vue'

defineProps<{
  rule: TaskRule
}>()

const selected = defineModel<TaskRule[]>('selected')
</script>
