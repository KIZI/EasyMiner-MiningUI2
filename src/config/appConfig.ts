import { type InterestMeasure, type InterestMeasureConfig, InterestMeasureTypes, InterestMeasures } from '@rulesMining/types/interestMeasure.types'

const minerId = import.meta.env.PROD ? window.minerId : import.meta.env.VITE_MINER_ID as number

type AppConfig = {
  minerId: number
  interestMeasures: Record<InterestMeasure, InterestMeasureConfig>
  truncateLength: Record<string, number>
  [key: string]: any
}

export const appConfig = {
  minerId,
  truncateLength: {
    miner: 80,
    attribute: 30,
    ruleSet: 50,
  },
  interestMeasures: {
    [InterestMeasures.Conf]: {
      name: InterestMeasures.Conf,
      type: InterestMeasureTypes.Double,
      isRequired: false,
      range: {
        from: { value: 0 },
        to: { closed: true, value: 1 },
      },
      defaultValue: 0.7,
      hasInitialValue: true,
    },
    [InterestMeasures.Support]: {
      name: InterestMeasures.Support,
      type: InterestMeasureTypes.Double,
      isRequired: false,
      range: {
        from: { value: 0 },
        to: { closed: true, value: 1 },
      },
      defaultValue: 0.05,
      hasInitialValue: true,
    },
    [InterestMeasures.Lift]: {
      name: InterestMeasures.Lift,
      type: InterestMeasureTypes.Double,
      defaultValue: 1.1,
      range: {
        from: { value: 0 },
      },
    },
    [InterestMeasures.Length]: {
      type: InterestMeasureTypes.Integer,
      name: InterestMeasures.Length,
      defaultValue: 5,
      range: {
        from: { closed: true, value: 1 },
        to: { closed: true, value: 10 },
      },
    },
    [InterestMeasures.AAD]: {
      name: InterestMeasures.AAD,
      type: InterestMeasureTypes.Double,
      range: {
        from: { value: 0 },
        to: { closed: true, value: 1 },
      },
      defaultValue: 0.1,
    },
    [InterestMeasures.AutoConfSupp]: {
      name: InterestMeasures.AutoConfSupp,
      type: InterestMeasureTypes.Boolean,
    },
  } as AppConfig['interestMeasures'],
} satisfies AppConfig
