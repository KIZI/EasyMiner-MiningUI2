<template>
  <div
    class="relative z-20 flex items-center gap-2 py-1.5 duration-100"
    :class="[
      spacingClass,
      colorSchemaClass,
      {
        'group hover:bg-primary-200': attribute.isAvailable,
        'cursor-pointer': isListInteractive,
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
          v-if="attribute.isAvailable"
          v-model="modelValue"
          class="size-4"
          :value="attribute"
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
        class="inline-flex min-w-0 select-none items-center gap-2 py-2 pr-3 text-sm font-medium"
        :class="{
          'text-gray-500': !attribute.isAvailable,
          'cursor-pointer': isListInteractive,
        }"
        :title="attribute.name.length > 50 ? attribute.name : ''"
      >
        <span class="overflow-hidden truncate">{{ attribute.name }}</span>
      </label>
    </div>

    <div class="ml-auto flex items-center gap-x-1">
      <VButton
        variant="ghost"
        class="size-8 hover:bg-slate-200 group-hover:hover:bg-primary-50"
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

const props = defineProps<{
  attribute: ListAttribute
  isDragged?: boolean
  showIcon?: boolean
  isEven?: boolean
  spacingClass?: HTMLAttributes['class']
}>()

const attributesList = useInjectAttributesList()!
const { shouldShowSelection, isInteractive: isListInteractive, selection } = attributesList
const { modelValue } = selection

const isSelected = computed(() => {
  return selection.isItemSelected(props.attribute)
})

function toggleSelection() {
  if (!shouldShowSelection.value) return
  selection.toggleItem(props.attribute)
}

const attributeHistogramModal = useAttributeHistogramModal()

const colorSchemaClass = computed(() => {
  if (props.isDragged) return clsx('bg-primary-100')
  if (isSelected.value) return clsx('bg-primary-100')
  if (props.isEven) return clsx('bg-slate-50')
  return ''
})

const icon = computed(() => {
  if (props.attribute.type === 'nominal') {
    return defineAsyncComponent(() => import('~icons/carbon/character-upper-case'))
  }

  return defineAsyncComponent(() => import('~icons/carbon/character-whole-number'))
})
</script>
