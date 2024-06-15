import { onClickOutside } from '@vueuse/core'
import type { MaybeRef, Ref } from 'vue'
import { onMounted, onUnmounted, ref, toValue, watch } from 'vue'

export function useDialog(open: Ref<boolean>, dismissible: MaybeRef<boolean> = true) {
  const isClosing = ref(false)
  const dialogRef = ref<HTMLDialogElement>()
  const dialogPanelRef = ref<HTMLDialogElement>()

  watch(() => open.value, updateModal)

  onClickOutside(dialogPanelRef, () => {
    if (!toValue(dismissible) || !open.value) return
    open.value = false
  })

  onMounted(() => {
    updateModal()
    dialogRef.value?.addEventListener('cancel', onCancel)
  })

  onUnmounted(() => {
    removeOverflowHidden()
    removeAnimationEndEventListener()
    dialogRef.value?.removeEventListener('cancel', onCancel)
  })

  function updateModal(value = open.value, oldValue = false) {
    if (!dialogRef.value) return

    if (open.value) return showModal()

    if (!value && oldValue && dialogRef.value.open) {
      closeModal()
    }
  }

  function showModal() {
    if (!dialogRef.value) {
      return
    }

    setOverflowHidden()

    dialogRef.value?.showModal()
  }

  function closeModal() {
    dialogRef.value?.addEventListener('animationend', onModalClosed)
    isClosing.value = true
  }

  function onModalClosed() {
    dialogRef.value?.close()
    isClosing.value = false
    open.value = false

    removeAnimationEndEventListener()
    removeOverflowHidden()
  }

  function removeAnimationEndEventListener() {
    dialogRef.value?.removeEventListener('animationend', onModalClosed)
  }

  function onCancel(e: Event) {
    e.preventDefault()
    if (!toValue(dismissible)) return
    closeModal()
  }

  function setOverflowHidden() {
    const bodyElement = document.querySelector('body')

    if (!bodyElement) {
      return
    }

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    bodyElement.style.overflow = 'hidden'
    bodyElement.style.paddingRight = `${scrollbarWidth}px`
  }

  function removeOverflowHidden() {
    const bodyElement = document.querySelector('body')

    if (!bodyElement) {
      return
    }

    bodyElement.style.overflow = ''
    bodyElement.style.paddingRight = ''
  }

  return {
    closeModal,
    dialogPanelRef,
    dialogRef,
    isClosing,
  }
}
