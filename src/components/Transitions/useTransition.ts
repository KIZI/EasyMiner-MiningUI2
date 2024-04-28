import { isNumber } from 'lodash-es'
import { computed } from 'vue'

type AnimationTypes = 'transition' | 'animation'

type BaseTransitionProps = {
  name?: string
  type?: AnimationTypes
  css?: boolean
  duration?: number | {
    enter: number
    leave: number
  }
  enterFromClass?: string
  enterActiveClass?: string
  enterToClass?: string
  appearFromClass?: string
  appearActiveClass?: string
  appearToClass?: string
  leaveFromClass?: string
  leaveActiveClass?: string
  leaveToClass?: string
}

export type VueTransitionProps = {
  duration?: number | {
    enter: number
    leave: number
  }
} & BaseTransitionProps

type UseTransitionOptions = {
  duration?: VueTransitionProps['duration']
  cssVars?: Record<string, string | number>
}

export function useTransition(
  props: VueTransitionProps,
  options: UseTransitionOptions = {
    duration: 500,
  },
) {
  const transitionDuration = computed(() => {
    const duration = props.duration ?? options.duration

    if (isNumber(duration)) {
      return {
        enter: duration,
        leave: duration,
      }
    }

    return {
      enter: duration?.enter,
      leave: duration?.leave,
    }
  })

  const durationCssVars = computed(() => [
    `--duration-enter: ${transitionDuration.value.enter}ms`,
    `--duration-leave: ${transitionDuration.value.leave}ms`,
  ])

  const optionsCssVars = computed(() => (
    Object.entries(options.cssVars ?? {}).map(([key, value]) => `--${key}: ${value}`)
  ))

  const cssVars = computed(() => [
    ...optionsCssVars.value,
    ...durationCssVars.value,
  ].join(';'))

  return {
    cssVars,
  }
}
