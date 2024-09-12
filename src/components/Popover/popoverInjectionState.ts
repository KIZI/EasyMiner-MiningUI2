import { createInjectionState } from '@vueuse/core'
import { type MaybeRef, type Ref, computed, ref, toValue } from 'vue'

export const [
  useProvidePopoverState,
  useInjectPopoverState,
] = createInjectionState(({
  asTooltip = false,
  isOpen = ref(false),
}: {
  asTooltip?: MaybeRef<boolean>
  isOpen?: Ref<boolean>
}) => {
  const isMouseOver = ref(false)
  const isVisible = computed(() => isOpen.value || (toValue(asTooltip) && isMouseOver.value))

  let timeout = 0

  function handleMouseOver() {
    if (isOpen.value || timeout) return

    timeout = setTimeout(() => {
      isMouseOver.value = true
      isOpen.value = true
      clearOpenTimeout()
    }, 300)
  }

  function clearOpenTimeout() {
    clearTimeout(timeout)
    timeout = 0
  }

  function handleMouseLeave() {
    clearOpenTimeout()

    if (!isMouseOver.value) return
    isMouseOver.value = false
    isOpen.value = false
  }

  function handleClick(event: MouseEvent) {
    event.stopImmediatePropagation()
    clearOpenTimeout()

    if (isMouseOver.value) {
      isMouseOver.value = false
      return
    }

    isOpen.value = !isOpen.value
  }

  const triggerEvents = computed(() => {
    if (!toValue(asTooltip)) return {}

    return {
      mouseover: handleMouseOver,
      mouseleave: handleMouseLeave,
      click: handleClick,
    }
  })

  return {
    asTooltip,
    isMouseOver,
    isOpen,
    isVisible,
    triggerEvents,
  }
})
