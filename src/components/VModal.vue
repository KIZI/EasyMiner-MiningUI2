<template>
  <dialog
    ref="dialogRef"
    class="
      modal m-auto max-h-[90vh] w-full overflow-hidden
      rounded bg-white p-0 shadow-xl backdrop:bg-gray-900/40
    "
    :class="[
      defaultTwClass('max-w-5xl'),
      {
        'grid': open,
        'modal--closing': isClosing,
      }
    ]"
  >
    <div ref="dialogPanelRef">
      <div class="flex items-center justify-between">
        <div>
          <slot name="title" />
        </div>

        <button
          class="rounded-md bg-white text-gray-900 hover:text-gray-600"
          @click="closeModal"
        >
          <icon-ph-x :width="25" />
        </button>
      </div>
      <slot v-if="open || isClosing" />
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDefaultTwClass } from '@/composables/useDefaultTwClass';
import { useDialog } from '@/composables/useDialog';

const props = defineProps<{
  open: boolean,
}>();
const emit = defineEmits(['close']);

const open = computed({
  get: () => props.open,
  set: (value: boolean) => {
    if (!value) emit('close');
  },
});

const {
  closeModal,
  dialogPanelRef,
  dialogRef,
  isClosing,
} = useDialog(open);

const { defaultTwClass } = useDefaultTwClass();
</script>

<style>
.modal, .modal::backdrop {
    --dialog-animation-duration-in: 0.2s;
    --dialog-animation-duration-out: 0.1s;
}

.modal[open] {
    animation: show-dialog var(--dialog-animation-duration-in) ease-in;
}
.modal[open].modal--closing {
    animation: hide-dialog var(--dialog-animation-duration-out) ease-in;
}

.modal[open]::backdrop {
    animation: show-backdrop var(--dialog-animation-duration-in) ease-out;
}
.modal[open].modal--closing::backdrop {
    animation: hide-backdrop var(--dialog-animation-duration-out) ease-in;
}

@keyframes show-dialog {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
@keyframes hide-dialog {
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
