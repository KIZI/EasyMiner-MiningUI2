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

  return {
    isMouseOver,
    isOpen,
    isVisible,
  }
})
