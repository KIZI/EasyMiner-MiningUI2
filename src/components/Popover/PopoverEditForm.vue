<template>
  <SlideTransition
    direction="up"
    :duration="{enter: 200, leave: 150}"
  >
    <div
      v-if="isOpen"
      class="absolute bottom-0 z-[110] h-0"
      :class="popoverClass"
    >
      <div
        class="pt-1"
      >
        <div
          class="rounded-md bg-white px-3 pb-4 shadow-lg ring-1 ring-black/5"
          :class="{
            'pt-3': !title,
            'pt-2': title,
          }"
        >
          <h2
            v-if="title"
            class="mb-1 flex items-center gap-x-2 text-sm font-semibold"
          >
            {{ title }}
          </h2>

          <SwitchTransition :preserve-height="preserveHeight">
            <template
              v-if="!showConfirmRemove"
              #left
            >
              <form @submit.prevent="handleSubmit">
                <slot />
                <div class="mt-5 flex gap-x-2">
                  <VButton
                    v-if="isEdit"
                    type="button"
                    size="xs"
                    :variant="confirmRemove ? 'danger-outline-light' : 'danger-light'"
                    :loading="isRemoveLoading"
                    :disabled="isCreateLoading"
                    @click="handleRemove"
                  >
                    Remove
                  </VButton>

                  <div class="ml-auto" />

                  <VButton
                    type="button"
                    size="xs"
                    :disabled="isCreateLoading || isRemoveLoading"
                    @click="handleCancel"
                  >
                    Cancel
                  </VButton>

                  <VButton
                    size="xs"
                    variant="primary-light"
                    :loading="isCreateLoading"
                    :disabled="isRemoveLoading"
                  >
                    <template v-if="isEdit">
                      {{ editLabel }}
                    </template>
                    <template v-else>
                      {{ createLabel }}
                    </template>
                  </VButton>
                </div>
              </form>
            </template>

            <template
              v-else
              #right
            >
              <div class="flex h-full flex-col">
                <div class="mt-2 flex gap-x-2 text-red-700">
                  <icon-ph-warning class="mt-1 h-4 w-4 shrink-0" />
                  <span class="text-sm font-medium">
                    {{ removeConfirmLabel }}
                  </span>
                </div>

                <div class="mt-auto flex justify-end gap-x-2 pt-5">
                  <VButton
                    type="button"
                    size="xs"
                    @click="showConfirmRemove = false"
                  >
                    No
                  </VButton>
                  <VButton
                    v-if="isEdit"
                    type="button"
                    size="xs"
                    variant="danger-light"
                    :loading="isRemoveLoading"
                    @click="handleRemove"
                  >
                    Yes
                  </VButton>
                </div>
              </div>
            </template>
          </SwitchTransition>
        </div>
      </div>
    </div>
  </SlideTransition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { useInjectPopoverState } from './popoverInjectionState';
import SlideTransition from '@/components/Transitions/SlideTransition.vue';
import SwitchTransition from '@/components/Transitions/SwitchTransition.vue';
import VButton from '@/components/VButton.vue';
import { useBackdropModel } from '@/components/Backdrop';

const props = defineProps<{
  isEdit?: boolean,
  popoverClass?: string,
  title?: string,
  editLabel?: string,
  removeConfirmLabel?: string,
  createLabel?: string,
  confirmRemove?: boolean,
  isCreateLoading?: boolean,
  isRemoveLoading?: boolean,
  preserveHeight?: boolean,
}>();

const {
  editLabel = 'Save',
  createLabel = 'Create',
} = props;

const emit = defineEmits(['remove', 'save', 'submit']);

const { isOpen } = useInjectPopoverState()!;
useBackdropModel({ vModel: isOpen });

const showConfirmRemove = ref(false);
watchEffect(() => {
  if (!isOpen.value) showConfirmRemove.value = false;
});

function handleSubmit() {
  emit('submit');
}
function handleRemove() {
  if (props.confirmRemove && !showConfirmRemove.value) {
    showConfirmRemove.value = true;
    return;
  }

  emit('remove');
}
function handleCancel() {
  isOpen.value = false;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    handleCancel();
  }
}
onMounted(() => {
  document.addEventListener('keydown', onKeydown);
});
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown);
});
</script>
