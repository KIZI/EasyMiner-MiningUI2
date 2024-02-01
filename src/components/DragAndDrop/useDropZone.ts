import { ref, computed, watch } from 'vue';
import { useDragAndDropStore } from '@/components/DragAndDrop/dragAndDropStore';
import type { DragSource } from '@/components/DragAndDrop/dragAndDropStore';
import { isElementInBoundaryElement } from '@/utils/isElementInBoundaryElement';

const draggedOverDropZonesCount = ref(0);
const isDropZonesConflicting = computed(() => draggedOverDropZonesCount.value > 1);

export function useDropZone<TPayload>(options: {
  accepts: DragSource[],
  onDrop(payload: TPayload): void,
}) {
  const dragAndDropStore = useDragAndDropStore();

  dragAndDropStore.$onAction((action) => {
    if (action.name === 'dropItem') {
      onDraggedItemDrop();

      action.after(() => {
        isDraggedIn.value = false;
        isDraggedOver.value = false;
      });
    }
  });

  function onDraggedItemDrop() {
    if (!dragAndDropStore.draggedItem) return;
    if (!isDraggedOver.value) return;
    if (isDropZonesConflicting.value && !isDraggedIn.value) return;

    options.onDrop(dragAndDropStore.draggedItem.payload);
  }

  const dropZoneRef = ref<HTMLElement>();

  const isDraggedIn = ref(false);
  const isDraggedOver = ref(false);

  const isDraggedOverFlag = computed(() => {
    if (isDropZonesConflicting.value) return isDraggedIn.value;
    return isDraggedOver.value;
  });

  const isAvailable = computed(() => {
    if (!dragAndDropStore.draggedItem) return false;
    return options.accepts.includes(dragAndDropStore.draggedItem.source);
  });

  watch(isDraggedOver, updateDraggedOverDropZonesCount);
  function updateDraggedOverDropZonesCount(isDraggedIn: boolean, previousIsDraggedOver: boolean) {
    if (isDraggedIn && !previousIsDraggedOver) {
      draggedOverDropZonesCount.value += 1;
      return;
    }

    if (!isDraggedIn && previousIsDraggedOver) {
      draggedOverDropZonesCount.value -= 1;
    }
  }

  watch(() => dragAndDropStore.draggedItem?.position, updateDraggedState);
  function updateDraggedState() {
    if (!isAvailable.value || !dragAndDropStore.draggedItem?.elementRef || !dropZoneRef.value) return;

    isDraggedIn.value = isElementInBoundaryElement({
      element: dragAndDropStore.draggedItem.elementRef,
      boundaryElement: dropZoneRef.value,
    });

    isDraggedOver.value = isElementInBoundaryElement({
      element: dragAndDropStore.draggedItem.elementRef,
      boundaryElement: dropZoneRef.value,
      partial: true,
    });
  }

  return {
    dropZoneRef,
    isAvailable,
    isDraggedOver: isDraggedOverFlag,
  };
}
