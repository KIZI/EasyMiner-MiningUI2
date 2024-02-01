import { useMouse } from '@vueuse/core';
import {
  ref, computed, watchEffect, watch, reactive,
} from 'vue';

export type Draggable = ReturnType<typeof useDraggable>;

export function useDraggable(options: {
  payload: any,
  onDragStart?: (draggable: any) => void,
  onDragEnd?: () => void,
}) {
  const mouseMoveThreshold = 5;

  const isMousePressed = ref(false);
  const isMouseDragged = ref(false);
  const isTouchDragged = ref(false);

  const isDragged = computed(() => isMouseDragged.value || isTouchDragged.value);

  const mouse = useMouse({ touch: false });
  const mousePosition = computed(() => ({ x: mouse.x.value, y: mouse.y.value }));
  const touchPosition = ref({ x: 0, y: 0 });

  const startPosition = ref({ x: 0, y: 0 });
  const dragPosition = computed(() => {
    if (isTouchDragged.value) return touchPosition.value;
    return mousePosition.value;
  });

  watchEffect(() => {
    if (!isMousePressed.value || isMouseDragged.value) return;

    if (
      Math.abs(mousePosition.value.x - startPosition.value.x) < mouseMoveThreshold &&
        Math.abs(mousePosition.value.y - startPosition.value.y) < mouseMoveThreshold
    ) return;

    isMouseDragged.value = true;
  });

  watch(isDragged, (isDragged) => {
    if (isDragged) return onDragStart();
    onDragEnd();
  });

  function onDragStart() {
    document.body.classList.toggle('dragging-active', true);

    options?.onDragStart?.({
      dragPosition,
      payload: options.payload,
    });
  }

  function onDragEnd() {
    document.body.classList.toggle('dragging-active', false);

    options?.onDragEnd?.();
  }

  function onMouseDown() {
    isMousePressed.value = true;
    startPosition.value = mousePosition.value;
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseUp() {
    isMouseDragged.value = false;
    isMousePressed.value = false;

    document.removeEventListener('mouseup', onMouseUp);
  }

  function onTouchMove(e: TouchEvent) {
    e.preventDefault();
    isTouchDragged.value = true;

    const touch = e.touches[0];
    touchPosition.value = { x: touch.clientX, y: touch.clientY };
  }
  function onTouchEnd() {
    isTouchDragged.value = false;
  }
  function onTouchCancel() {
    isTouchDragged.value = false;
  }

  const events = {
    mousedown: onMouseDown,
    touchcancel: onTouchCancel,
    touchend: onTouchEnd,
    touchmove: onTouchMove,
  };

  return reactive({
    dragPosition,
    events,
    isDragged,
    payload: options.payload,
  });
}
