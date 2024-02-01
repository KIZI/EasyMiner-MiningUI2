<template>
  <dialog
    ref="dialogRef"
    class="
      popup-modal m-auto w-full overflow-hidden rounded-md
      bg-white px-3 pb-4 pt-2 shadow-lg ring-1 ring-black/10 backdrop:bg-gray-900/30
    "
    :class="[
      {
        'modal--closing': isClosing,
      }
    ]"
  >
    <div ref="dialogPanelRef">
      <slot v-if="open || isClosing" />
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { useDefaultTwClass } from '@/composables/useDefaultTwClass';
import { useDialog } from '@/composables/useDialog';

const props = withDefaults(defineProps<{
  modelValue: boolean,
}>(), {
  modelValue: false,
});

const emit = defineEmits(['']);

const open = useVModel(props, 'modelValue', emit);
const {
  closeModal,
  dialogPanelRef,
  dialogRef,
  isClosing,
} = useDialog(open);

const { defaultTwClass } = useDefaultTwClass();
</script>

<style>
.popup-modal, .popup-modal::backdrop {
    --dialog-animation-duration-in: 0.2s;
    --dialog-animation-duration-out: 0.1s;
}

.popup-modal[open] {
    animation: show-popup-dialog var(--dialog-animation-duration-in) ease-in;
}
.popup-modal[open].modal--closing {
    animation: hide-popup-dialog var(--dialog-animation-duration-out) ease-in;
}

.popup-modal[open]::backdrop {
    animation: show-backdrop var(--dialog-animation-duration-in) ease-out;
}
.popup-modal[open].modal--closing::backdrop {
    animation: hide-backdrop var(--dialog-animation-duration-out) ease-in;
}

@keyframes show-popup-dialog {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
@keyframes hide-popup-dialog {
    to {
        opacity: 0;
        transform: scale(0.95);
    }
}

@keyframes show-backdrop {
    from { opacity: 0 }
    to { opacity: 1 }
}
@keyframes hide-backdrop {
    to { opacity: 0 }
}
</style>
