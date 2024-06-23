import { computed, ref } from 'vue'
import { useMouseInElement } from '@vueuse/core'
import { useDragAndDropStore } from '@/components/DragAndDrop/dragAndDropStore'
import type { DragSource } from '@/components/DragAndDrop/dragAndDropStore'

export function useDropZone<TPayload>(options: {
  accepts: DragSource[]
  onDrop: (payload: TPayload) => void
}) {
  const dragAndDropStore = useDragAndDropStore()

  const dropZoneRef = ref<HTMLElement>()

  const { isOutside: isMouseOutside } = useMouseInElement(dropZoneRef)
  const isMouseInDropZone = computed(() => !isMouseOutside.value)

  dragAndDropStore.$onAction((action) => {
    if (action.name === 'dropItem') {
      if (action.args[0]?.cancelled) return
      onDraggedItemDrop()
    }
  })

  function onDraggedItemDrop() {
    if (!dragAndDropStore.draggedItem) return
    if (!isMouseInDropZone.value) return

    options.onDrop(dragAndDropStore.draggedItem.payload)
  }

  const isDraggedOverFlag = computed(() => {
    return dragAndDropStore.isActive && isMouseInDropZone.value
  })

  const isAvailable = computed(() => {
    if (!dragAndDropStore.draggedItem) return false
    return options.accepts.includes(dragAndDropStore.draggedItem.source)
  })

  return {
    dropZoneRef,
    isAvailable,
    isDraggedOver: isDraggedOverFlag,
  }
}
