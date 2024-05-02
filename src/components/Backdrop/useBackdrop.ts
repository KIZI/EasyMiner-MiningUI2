import { type Ref, onUnmounted, ref, watch } from 'vue'

const DEFAULT_OPACITY = 0.1

const isVisible = ref(false)
const opacity = ref(DEFAULT_OPACITY)
const usageCount = ref(0)

export function useBackdrop() {
  function show(options: { opacity?: number } = {}) {
    usageCount.value += 1
    isVisible.value = true
    opacity.value = options.opacity ?? DEFAULT_OPACITY
  }

  function hide() {
    usageCount.value -= 1
    if (usageCount.value > 0) return

    isVisible.value = false
  }

  return {
    isVisible,
    opacity,
    show,
    hide,
  }
}

type UseBackdropModelOptions = {
  opacity?: number
  vModel: Ref<boolean>
}

export function useBackdropModel({ vModel, opacity }: UseBackdropModelOptions) {
  const { show, hide } = useBackdrop()

  watch(vModel, (value) => {
    if (value) return show({ opacity })
    hide()
  })

  onUnmounted(() => {
    hide()
  })
}
