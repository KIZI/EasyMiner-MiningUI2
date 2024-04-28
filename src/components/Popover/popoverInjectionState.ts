import { createInjectionState } from '@vueuse/core'
import { type MaybeRef, computed, ref, toValue } from 'vue'

export const [
  useProvidePopoverState,
  useInjectPopoverState,
] = createInjectionState(({
  asTooltip = false,
}: {
  asTooltip?: MaybeRef<boolean>
}) => {
  const isOpen = ref(false)
  const isMouseOver = ref(false)
  const isVisible = computed(() => isOpen.value || (toValue(asTooltip) && isMouseOver.value))

  return {
    isMouseOver,
    isOpen,
    isVisible,
  }
})
