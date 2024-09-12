<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="$attrs"
      side="bottom"
      align="start"
      :class="[
        'z-[110]',
        'animation-duration-200',
        'data-[state=open]:animate-in',
        'data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0',
        'data-[state=open]:fade-in-0',
        'data-[state=closed]:slide-out-to-bottom-0.5',
        'data-[state=open]:slide-in-from-bottom-0.5',
      ]"
    >
      <div class="pt-1">
        <div
          class="rounded-md bg-white px-3 pb-4 shadow-lg ring-1 ring-black/5"
          :class="{
            'pt-3': !title,
            'pt-2': title,
          }"
        >
          <h2
            v-if="title"
            class="mb-1 flex items-center gap-x-2 break-all text-sm font-semibold"
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
                <div class="mt-6 flex gap-x-2">
                  <VButton
                    v-if="isEdit"
                    type="button"
                    size="xs"
                    variant="ghost"
                    class="text-red-700 hover:bg-red-50"
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
                  <icon-ph-warning class="mt-1 size-4 shrink-0" />
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
    </PopoverContent>
  </PopoverPortal>
</template>

<script setup lang="ts">
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'radix-vue'
import { ref, watchEffect } from 'vue'
import { useEventListener } from '@vueuse/core'
import { useInjectPopoverState } from './popoverInjectionState'
import SlideTransition from '@/components/Transitions/SlideTransition.vue'
import SwitchTransition from '@/components/Transitions/SwitchTransition.vue'
import VButton from '@/components/VButton.vue'
import { useBackdropModel } from '@/components/Backdrop'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  isEdit?: boolean
  popoverClass?: string
  title?: string
  editLabel?: string
  removeConfirmLabel?: string
  createLabel?: string
  confirmRemove?: boolean
  isCreateLoading?: boolean
  isRemoveLoading?: boolean
  preserveHeight?: boolean
}>()

const emit = defineEmits(['remove', 'save', 'submit'])

const {
  editLabel = 'Save',
  createLabel = 'Create',
} = props

const { isOpen } = useInjectPopoverState()!
useBackdropModel({ vModel: isOpen })

const showConfirmRemove = ref(false)
watchEffect(() => {
  if (!isOpen.value) showConfirmRemove.value = false
})

function handleSubmit() {
  emit('submit')
}
function handleRemove() {
  if (props.confirmRemove && !showConfirmRemove.value) {
    showConfirmRemove.value = true
    return
  }

  emit('remove')
}
function handleCancel() {
  isOpen.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    handleCancel()
  }
}

useEventListener(document, 'keydown', onKeydown)
</script>
