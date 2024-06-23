import { useMouse } from '@vueuse/core'
import {
  type StyleValue,
  computed,
  reactive,
  ref,
  watch,
  watchEffect,
} from 'vue'

export type Draggable = ReturnType<typeof useDraggable>

export type DragEndFlags = { cancelled?: boolean }

export function useDraggable(options: {
  payload: any
  onDragStart?: () => void
  onDragEnd?: (flags: DragEndFlags) => void
}) {
  const mouseMoveThreshold = 5

  const isMousePressed = ref(false)
  const isMouseDragged = ref(false)
  const isTouchDragged = ref(false)

  const isDragged = computed(() => isMouseDragged.value || isTouchDragged.value)

  const mouse = useMouse({ touch: false })
  const mousePosition = computed(() => ({ x: mouse.x.value, y: mouse.y.value }))
  const touchPosition = ref({ x: 0, y: 0 })

  const startPosition = ref({ x: 0, y: 0 })
  const dragPosition = computed(() => {
    if (isTouchDragged.value) return touchPosition.value
    return mousePosition.value
  })

  const delta = computed(() => {
    const x = dragPosition.value.x - startPosition.value.x
    const y = dragPosition.value.y - startPosition.value.y
    return { x, y }
  })

  watchEffect(() => {
    if (!isMousePressed.value || isMouseDragged.value) return

    if (
      Math.abs(mousePosition.value.x - startPosition.value.x) < mouseMoveThreshold
      && Math.abs(mousePosition.value.y - startPosition.value.y) < mouseMoveThreshold
    ) {
      return
    }

    isMouseDragged.value = true
  })

  watch(isDragged, (isDragged) => {
    if (isDragged) return onDragStart()
  })

  function onDragStart() {
    window.addEventListener('keydown', onKeyPress)
    document.body.classList.toggle('dragging-active', true)

    options?.onDragStart?.()
  }

  function onDragEnd(flags: DragEndFlags = {}) {
    window.removeEventListener('keydown', onKeyPress)
    document.body.classList.toggle('dragging-active', false)

    options?.onDragEnd?.(flags)
  }

  function onKeyPress(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      endMousePress()
      onDragEnd({ cancelled: true })
    }
  }

  function onMouseDown() {
    isMousePressed.value = true
    startPosition.value = mousePosition.value
    document.addEventListener('mouseup', onMouseUp)
  }

  function onMouseUp() {
    endMousePress()
    onDragEnd()
  }

  function endMousePress() {
    isMouseDragged.value = false
    isMousePressed.value = false

    document.removeEventListener('mouseup', onMouseUp)
  }

  function onTouchMove(e: TouchEvent) {
    e.preventDefault()
    isTouchDragged.value = true

    const touch = e.touches[0]
    touchPosition.value = { x: touch.clientX, y: touch.clientY }
  }
  function onTouchEnd() {
    isTouchDragged.value = false
  }
  function onTouchCancel() {
    isTouchDragged.value = false
  }

  const events = {
    mousedown: onMouseDown,
    touchcancel: onTouchCancel,
    touchend: onTouchEnd,
    touchmove: onTouchMove,
  }

  const draggedElementStyle = computed<StyleValue>(() => {
    return {
      position: 'absolute',
      left: `${startPosition.value.x}px`,
      top: `${startPosition.value.y}px`,
      transform: `translate(${delta.value.x}px, ${delta.value.y}px)`,
    }
  })

  return reactive({
    dragPosition,
    events,
    isDragged,
    payload: options.payload,
    startPosition,
    delta,
    draggedElementStyle,
  })
}
