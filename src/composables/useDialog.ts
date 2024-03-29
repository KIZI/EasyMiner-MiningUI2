import { onClickOutside } from '@vueuse/core';
import type { Ref } from 'vue';
import { onUnmounted, onMounted, watch, ref } from 'vue';

const openedDialogsCount = ref(0);

export const useDialog = (open: Ref<boolean>) => {
  const isClosing = ref(false);
  const dialogRef = ref<HTMLDialogElement>();
  const dialogPanelRef = ref<HTMLDialogElement>();

  watch(() => open.value, updateModal);

  onClickOutside(dialogPanelRef, () => {
    if (!open.value) return;
    open.value = false;
  });

  onMounted(() => {
    updateModal();
    dialogRef.value?.addEventListener('cancel', onCancel);
  });

  onUnmounted(() => {
    removeAnimationEndEventListener();
    dialogRef.value?.removeEventListener('cancel', onCancel);
  });

  function updateModal(value = open.value, oldValue = false) {
    if (!dialogRef.value) return;

    if (open.value) return showModal();

    if (!value && oldValue && dialogRef.value.open) {
      closeModal();
    }
  }

  function showModal() {
    if (!dialogRef.value) {
      return;
    }

    if (!openedDialogsCount.value) {
      setOverflowHidden();
    }

    dialogRef.value?.showModal();
    openedDialogsCount.value++;
  }

  function closeModal() {
    dialogRef.value?.addEventListener('animationend', onModalClosed);
    isClosing.value = true;
  }

  function onModalClosed() {
    openedDialogsCount.value--;
    isClosing.value = false;
    dialogRef.value?.close();
    removeAnimationEndEventListener();
    open.value = false;

    if (!openedDialogsCount.value) {
      removeOverflowHidden();
    }
  }

  function removeAnimationEndEventListener() {
    dialogRef.value?.removeEventListener('animationend', onModalClosed);
  }

  function onCancel(e: Event) {
    e.preventDefault();
    closeModal();
  }

  function setOverflowHidden() {
    const bodyElement = document.querySelector('body');

    if (!bodyElement) {
      return;
    }

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    bodyElement.style.overflow = 'hidden';
    bodyElement.style.paddingRight = `${scrollbarWidth}px`;
  }

  function removeOverflowHidden() {
    const bodyElement = document.querySelector('body');

    if (!bodyElement) {
      return;
    }

    bodyElement.style.overflow = '';
    bodyElement.style.paddingRight = '';
  }

  return {
    closeModal,
    dialogPanelRef,
    dialogRef,
    isClosing,
  };
};
