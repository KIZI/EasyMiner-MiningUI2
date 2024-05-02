<template>
  <div class="flex items-start pb-3.5 pt-2.5">
    <div class="relative space-y-0.5 pl-7">
      <label class="text-sm font-medium leading-relaxed tracking-wide">
        <VCheckbox
          v-model="selected"
          :value="rule"
          class="absolute left-0 mt-1.5 size-4"
        />

        <span class="cursor-pointer">{{ rule.text }}</span>
      </label>

      <div class="space-x-4 text-xs leading-none">
        <span v-for="[measureKey, measureName] in presentMeasures" :key="measureKey">
          {{ $t(`interestMeasures.${measureName}.name`) }}:
          <span class="font-semibold text-primary-700">
            {{ formatDecimal(rule[measureKey]) }}
          </span>
        </span>
      </div>
    </div>

    <div class="ml-auto mt-0.5 flex shrink-0 items-center space-x-1">
      <TaskRuleDetailsPopover :rule="rule" />

      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type InterestMeasure, InterestMeasures } from '@rulesMining/types/interestMeasure.types'
import { computed } from 'vue'
import type { TaskRule, TaskWithSettings } from '@/api/tasks/types'
import VCheckbox from '@/components/Form/VCheckbox.vue'
import { formatDecimal } from '@/utils/format'
import TaskRuleDetailsPopover from '@/components/Task/TaskRuleDetailsPopover.vue'

const props = defineProps<{
  rule: TaskRule
  task?: TaskWithSettings
}>()

const interestMeasuresKeysMap = {
  confidence: InterestMeasures.Conf,
  support: InterestMeasures.Support,
  lift: InterestMeasures.Lift,
} satisfies Partial<Record<keyof TaskRule, InterestMeasure>>

const presentMeasures = computed(() => {
  const interestMeasuresEntries = Object.entries(interestMeasuresKeysMap) as ([keyof typeof interestMeasuresKeysMap, InterestMeasure])[]
  return interestMeasuresEntries.filter(([measureKey, measureName]) => {
    const isOnAttribute = !!props.rule[measureKey]
    const isOnTask = props.task ? props.task.settings.rule0.iMs.find(im => im.name === measureName) : true
    return isOnAttribute && isOnTask
  })
})

const selected = defineModel<TaskRule[]>('selected')
</script>
