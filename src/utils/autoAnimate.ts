import { getTransitionSizes } from '@formkit/auto-animate'
import type { AutoAnimationPlugin } from '@formkit/auto-animate'

type Coordinates = {
  top: number
  left: number
  width: number
  height: number
}
type Action = 'add' | 'remove' | 'remain'

type GetActionKeyframesOptions = ({
  el,
  oldCoords,
  newCoords,
}: {
  el: Element
  oldCoords: Coordinates
  newCoords: Coordinates
}) => {
  keyframes: Keyframe[]
  options: KeyframeAnimationOptions
}

const DELAY = 0
const DEFAULT_DURATION = 400

const getAddKeyframesOptions: GetActionKeyframesOptions = ({ el }) => {
  const easing = 'ease-in'

  const isLast = !(el.nextElementSibling)?.tagName
  const duration = isLast ? DEFAULT_DURATION * 0.5 : DEFAULT_DURATION

  const keyframes = [
    {
      transform: 'scale(.98)',
      opacity: 0,
    },
    { transform: 'scale(0.98)', opacity: 0, offset: 0.5 },
    { transform: 'scale(1)', opacity: 1 },
  ]

  return { keyframes, options: { duration, easing } }
}

const getRemoveKeyframesOptions: GetActionKeyframesOptions = () => {
  const easing = 'ease-out'

  const keyframes = [
    {
      transform: 'scale(1)',
      opacity: 1,
    },
    {
      transform: 'scale(.98)',
      opacity: 0,
    },
  ]

  return { keyframes, options: { easing } }
}

const getRemainKeyframesOptions: GetActionKeyframesOptions = ({ el, newCoords, oldCoords }) => {
  const easing = 'ease-in-out'

  const deltaX = oldCoords.left - newCoords.left
  const deltaY = oldCoords.top - newCoords.top

  const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(
    el,
    oldCoords,
    newCoords,
  )

  const start: Keyframe = { transform: `translate(${deltaX}px, ${deltaY}px)` }
  const mid: Keyframe = {
    transform: `translate(${deltaX * -0.15}px, ${deltaY * -0.15}px)`,
    offset: 0.75,
  }
  const end: Keyframe = { transform: 'translate(0, 0)' }

  if (widthFrom !== widthTo) {
    start.width = `${widthFrom}px`
    mid.width = `${widthFrom >= widthTo ? widthTo / 1.05 : widthTo * 1.05}px`
    end.width = `${widthTo}px`
  }

  if (heightFrom !== heightTo) {
    start.height = `${heightFrom}px`
    mid.height = `${heightFrom >= heightTo ? heightTo / 1.05 : heightTo * 1.05}px`
    end.height = `${heightTo}px`
  }

  const keyframes = [start, mid, end]

  return { keyframes, options: { easing } }
}

const actionKeyframesOptionsMap = {
  add: getAddKeyframesOptions,
  remove: getRemoveKeyframesOptions,
  remain: getRemainKeyframesOptions,
} satisfies Record<Action, GetActionKeyframesOptions>

export const autoAnimateKeyframeEffect: AutoAnimationPlugin = (el, action, oldCoordsArg, newCoordsArg) => {
  if (action === 'remain' || action === 'remove' || action === 'add') {
    const oldCoords = oldCoordsArg as Coordinates
    const newCoords = newCoordsArg as Coordinates

    const getActionKeyframesOptions = actionKeyframesOptionsMap[action]
    const { keyframes, options } = getActionKeyframesOptions({ el, oldCoords, newCoords })

    return new KeyframeEffect(el, keyframes, {
      delay: DELAY,
      duration: DEFAULT_DURATION,
      ...options,
    })
  }

  return new KeyframeEffect(el, {})
}
