export type InterestMeasureItem = {
  label: string
  description: string
  name: InterestMeasure
  range: InterestMeasureRange
  type: InterestMeasureType
  defaultValue?: number
  value?: number | null
  isRequired?: boolean
}
export type InteresetMeasureActiveItem = InterestMeasureItem & { value: number }

export const interestMeasureAuto = 'AUTO_CONF_SUPP'

export const interestMeasures = {
  Conf: 'CONF',
  Length: 'RULE_LENGTH',
  Lift: 'LIFT',
  Support: 'SUPP',
} as const
export type InterestMeasure = typeof interestMeasures[keyof typeof interestMeasures]

export const interestMeasureTypes = {
  Double: 'Double',
  Integer: 'Integer',
} as const
export type InterestMeasureType = typeof interestMeasureTypes[keyof typeof interestMeasureTypes]

export type InterestMeasureRange = {
  from: InterestMeasureRangePoint
  to: InterestMeasureRangePoint
}

type InterestMeasureRangePoint = {
  value: number
  closed?: boolean
}
