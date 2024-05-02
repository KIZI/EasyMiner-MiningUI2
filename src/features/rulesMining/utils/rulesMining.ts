import type { InterestMeasureActiveItem } from '@rulesMining/types/interestMeasure.types'
import type { AttributeSimpleInput, IMSimpleInput } from '@/api/model'
import type { CedentItem } from '@/features/rulesMining/types/rulePattern.types'
import { formatFixedValue } from '@/features/rulesMining/utils/format'
import type { Task } from '@/api/tasks/types'

export function patternItemToAttributeSimpleInput(item: CedentItem) {
  return {
    attribute: item.name,
    ...(item.fixedValue ? { fixedValue: item.fixedValue } : {}),
  } satisfies AttributeSimpleInput
}

export function interestMeasureToIMSimpleInput(item: InterestMeasureActiveItem) {
  return {
    name: item.name,
    ...(item.type !== 'Boolean' && { value: item.value }),
  } satisfies IMSimpleInput
}

export function constructMinerLabel(antecedent: CedentItem[], consequent: CedentItem[]) {
  const antecedentLabel = constructCedentLabel(antecedent)
  const consequentLabel = constructCedentLabel(consequent)

  return `${antecedentLabel} => ${consequentLabel}`
}

function constructCedentLabel(items: CedentItem[]) {
  return items.map(constructCedentItemLabel).join(' and ')
}

function constructCedentItemLabel(item: CedentItem) {
  const formattedFixedValue = formatFixedValue(item.fixedValue)
  return `${item.name} (${formattedFixedValue})`
}

export function isTaskRunning(task: Task) {
  return task.state === 'new' || task.state === 'in_progress'
}
