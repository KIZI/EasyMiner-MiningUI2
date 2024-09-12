import { computed, ref } from 'vue'
import { useElementBounding, useMouseInElement } from '@vueuse/core'
import { useDragAndDropStore } from '@/components/DragAndDrop/dragAndDropStore'
import type { DragSource } from '@/components/DragAndDrop/dragAndDropStore'

export function useDropZone<TPayload>(options: {
  accepts: DragSource[]
  onDrop: (payload: TPayload) => void
}) {
  const dragAndDropStore = useDragAndDropStore()

  const dropZoneRef = ref<HTMLElement>()
  const dropZoneBounding = useElementBounding(dropZoneRef)

  const isDraggedInDropZone = computed(() => {
    if (!dragAndDropStore.draggedItem) return false

    const draggable = dragAndDropStore.draggedItem.draggable
    const dragPosition = draggable.dragPosition

    const minX = dragPosition.x >= dropZoneBounding.x.value
    const maxX = dragPosition.x <= dropZoneBounding.x.value + dropZoneBounding.width.value

    const minY = dragPosition.y >= dropZoneBounding.y.value
    const maxY = dragPosition.y <= dropZoneBounding.y.value + dropZoneBounding.height.value

    const isInX = minX && maxX
    const isInY = minY && maxY

    return isInX && isInY
  })

  dragAndDropStore.dropItemEventHook.on(() => {
    if (!isDraggedInDropZone.value) return
    options.onDrop(dragAndDropStore.draggedItem!.payload)
  })

  const isDraggedOverFlag = computed(() => {
    return dragAndDropStore.isActive && isDraggedInDropZone.value
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
