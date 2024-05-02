import type { ValueOf } from 'type-fest'

export const InterestMeasures = {
  Conf: 'CONF',
  Support: 'SUPP',
  Lift: 'LIFT',
  Length: 'RULE_LENGTH',
  AAD: 'AAD',
  AutoConfSupp: 'AUTO_CONF_SUPP',
} as const

export type InterestMeasure = ValueOf<typeof InterestMeasures>
export type InterestMeasureActiveItem = InterestMeasureConfig & { value: number }

export const InterestMeasureTypes = {
  Double: 'Double',
  Integer: 'Integer',
  Boolean: 'Boolean',
} as const
export type InterestMeasureType = ValueOf<typeof InterestMeasureTypes>

export type InterestMeasureRange = {
  from: InterestMeasureRangePoint
  to: InterestMeasureRangePoint
}

type InterestMeasureRangePoint = {
  value: number
  closed?: boolean
}

export type InterestMeasureConfig = {
  name: InterestMeasure
  type: InterestMeasureType
  range?: InterestMeasureRange
  isRequired?: boolean
  defaultValue?: number
  hasInitialValue?: boolean
}

export const SpecialInterestMeasures = {
  CBA: 'CBA',
} as const
export type SpecialInterestMeasure = ValueOf<typeof SpecialInterestMeasures>
