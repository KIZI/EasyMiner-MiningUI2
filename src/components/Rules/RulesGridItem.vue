<template>
  <div
    class="flex cursor-pointer items-start border-l-4 pb-3.5 pt-2.5 peer-px"
    :class="rootClassname"
    @click="selectionModel.toggleItem(rule)"
  >
    <div class="relative pl-7">
      <VCheckbox
        :model-value="isSelected"
        class="pointer-events-none absolute left-0 mt-1 size-4"
      />
      <div class="-ml-2 cursor-auto px-2  text-black" @click.stop>
        <div class="inline-block pb-0.5 text-sm font-medium leading-relaxed tracking-wide">
          {{ rule.text }}
        </div>
        <div class="space-x-4 text-xs leading-none">
          <span v-for="[measureKey, measureName] in presentMeasures" :key="measureKey">
            {{ $t(`interestMeasures.${measureName}.name`) }}:
            <span class="font-semibold text-primary-700">
              {{ formatDecimal(rule[measureKey]) }}
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="ml-auto mt-0.5 flex shrink-0 items-center space-x-1" @click.stop>
      <RulesGridItemDetailsPopover :rule="rule" />
      <slot name="actions" :rule="rule" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type InterestMeasure, InterestMeasures } from '@rulesMining/types/interestMeasure.types'
import { computed } from 'vue'
import { useSelectedRules } from '@selectedRules/composables/useSelectedRules'
import clsx from 'clsx'
import type { TaskRule, TaskWithSettings } from '@/api/tasks/types'
import VCheckbox from '@/components/Form/VCheckbox.vue'
import { formatDecimal } from '@/utils/format'
import RulesGridItemDetailsPopover from '@/components/Rules/RulesGridItemDetailsPopover.vue'
import { injectRulesGrid } from '@/components/Rules/rulesGrid'

const props = defineProps<{
  rule: TaskRule
  task?: TaskWithSettings
  isOdd?: boolean
  highlightInSelectedRules?: boolean
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
    const isOnTask = props.task ? props.task.settings.rule0.iMs.find(im => im.name === measureName && Number(im.threshold) > 0) : true
    return isOnAttribute && isOnTask
  })
})

const rulesGrid = injectRulesGrid()!
const { selectionModel } = rulesGrid

const isSelected = computed(() => {
  return selectionModel.isItemSelected(props.rule)
})

const selectedRules = useSelectedRules()
const isInSelectedRules = computed(() => {
  return selectedRules.isRuleSelected(props.rule)
})

const rootClassname = computed(() => {
  const borderColor = (() => {
    if (isSelected.value) return clsx('border-l-primary-500')
    if (props.highlightInSelectedRules && isInSelectedRules.value) return clsx('border-l-green-500')
    return clsx('border-l-transparent')
  })()

  const backgroundColor = clsx('hover:bg-primary-100', {
    'bg-white': !props.isOdd,
    'bg-slate-50': props.isOdd,
  })

  return clsx(borderColor, backgroundColor)
})
</script>
