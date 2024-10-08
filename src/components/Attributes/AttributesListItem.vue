<template>
  <div
    class="relative flex items-center gap-2 py-1.5 pr-2 duration-100"
    :class="[
      spacingClass,
      colorSchemaClass,
      {
        'group [.hover_&]:bg-primary-200': attribute.isAvailable,
        'cursor-pointer': attribute.isAvailable && isListInteractive,
      },
    ]"
    @click="toggleSelection"
  >
    <div class="flex min-w-0 items-center gap-x-2">
      <div
        v-if="shouldShowSelection || showIcon"
        class="w-5"
      >
        <VCheckbox
          v-if="shouldShowSelection && attribute.isAvailable"
          :model-value="isSelected"
          class="pointer-events-none size-4"
        />
        <component
          :is="icon"
          v-else-if="showIcon"
          :width="20"
          :class="{
            'text-gray-500': !attribute.isAvailable,
          }"
        />
      </div>

      <label
        class="inline-flex min-w-0 select-none items-center gap-2 py-2 text-sm font-medium"
        :class="{
          'text-gray-500': !attribute.isAvailable,
          'cursor-pointer': attribute.isAvailable && isListInteractive,
        }"
        :title="attribute.name.length > 50 ? attribute.name : ''"
      >
        <span class="overflow-hidden truncate">{{ attribute.name }}</span>
      </label>
    </div>

    <div class="ml-auto flex items-center gap-x-0.5" @click.stop>
      <VButton
        variant="ghost"
        class="size-8"
        :class="[
          attribute.isAvailable && isListInteractive ? 'hover:bg-primary-50' : 'hover:bg-slate-200',
        ]"
        @click.stop="attributeHistogramModal.open(attribute.id, attribute.source)"
        @mousedown.stop
      >
        <icon-ph-chart-bar-duotone class="size-5 text-slate-600" />
      </VButton>
      <slot
        name="actions"
        :attribute="attribute"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import clsx from 'clsx'
import { type HTMLAttributes, computed, defineAsyncComponent } from 'vue'
import VCheckbox from '@/components/Form/VCheckbox.vue'
import { useAttributeHistogramModal } from '@/components/Attributes/useAttributeHistogramModal'
import { useInjectAttributesList } from '@/components/Attributes/attributesListInjection'
import type { ListAttribute } from '@/components/Attributes/useAttributesList'
import VButton from '@/components/VButton.vue'
import NominalIcon from '~icons/carbon/character-upper-case'
import NumericIcon from '~icons/carbon/character-whole-number'

const props = defineProps<{
  attribute: ListAttribute
  isDragged?: boolean
  showIcon?: boolean
  isEven?: boolean
  spacingClass?: HTMLAttributes['class']
}>()

const attributesList = useInjectAttributesList()!
const { shouldShowSelection, isInteractive: isListInteractive, selectionModel } = attributesList

const isSelected = computed(() => {
  return selectionModel.isItemSelected(props.attribute)
})

function toggleSelection() {
  if (!shouldShowSelection.value) return
  selectionModel.toggleItem(props.attribute)
}

const attributeHistogramModal = useAttributeHistogramModal()

const colorSchemaClass = computed(() => {
  if (props.isDragged) return clsx('bg-primary-100')
  if (isSelected.value) return clsx('bg-primary-100')
  if (props.isEven) return clsx('bg-slate-50')
  return clsx('bg-white')
})

const icon = computed(() => {
  if (props.attribute.type === 'nominal') {
    return NominalIcon
  }

  return NumericIcon
})
</script>
