<template>
  <div
    class="flex cursor-pointer items-start border-l-4 pb-3.5 pt-2.5 peer-px hover:bg-primary-100" :class="{
      'border-l-transparent': !isSelected,
      'border-l-primary-500': isSelected,
      'bg-slate-50': isOdd,
    }"
    @click="selectionModel.toggleItem(rule)"
  >
    <div class="relative pl-7">
      <label class="pointer-events-none inline-block pb-0.5 text-sm font-medium leading-relaxed tracking-wide">
        <VCheckbox
          v-model="selection"
          :value="rule"
          class="absolute left-0 mt-1 size-4"
        />
        <span>{{ rule.text }}</span>
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
      <slot name="actions" :rule="rule" />
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
import { useSelectionModel } from '@/composables/useSelectionModel'

const props = defineProps<{
  rule: TaskRule
  task?: TaskWithSettings
  isOdd?: boolean
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

const selection = defineModel<TaskRule[]>('selected', { default: [] })
const selectionModel = useSelectionModel({ modelValue: selection })

const isSelected = computed(() => {
  return selectionModel.isItemSelected(props.rule)
})
</script>
