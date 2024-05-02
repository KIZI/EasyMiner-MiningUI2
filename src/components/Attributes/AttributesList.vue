<template>
  <div class="select-none overflow-y-auto overflow-x-hidden overscroll-y-contain">
    <div class="flex flex-col">
      <div
        v-if="!filteredAttributes.length"
        class="py-4 text-sm"
      >
        <div
          v-if="isLoading"
          class="flex items-center gap-x-3"
          :class="spacingClass"
        >
          <VSpinner />
          <span>Attributes are loading...</span>
        </div>

        <div
          v-else
          :class="spacingClass"
        >
          <slot
            v-if="!attributes.length"
            name="empty"
          >
            <NoItemsMessage />
          </slot>

          <NoItemsMessage v-else />

          <button
            v-if="searchQuery"
            class="mt-4 flex items-center gap-x-1 hover:underline"
            @click="clearSearchQuery"
          >
            <icon-ph-x :width="18" />
            Clear search query
          </button>
        </div>
      </div>

      <div
        v-auto-animate="{ ...disableAnimation ? { duration: 0 } : {} }"
        class="divide-y divide-gray-50"
      >
        <slot name="beforeItems" />
        <template
          v-for="(attribute, i) in filteredAttributes"
          :key="attribute.id"
        >
          <HLDraggableAttribute
            v-slot="{ events, isDragged }"
            :attribute="attribute"
            @drag-start="onDragStart"
            @drag-end="onDragEnd"
          >
            <AttributesListItem
              :is-dragged="isDragged"
              :is-even="i % 2 !== 0"
              :attribute="attribute"
              :spacing-class="spacingClass"
              :show-icon="showIcon"
              v-on="dragSource ? events : {}"
            >
              <template #actions>
                <slot
                  name="itemActions"
                  :attribute="attribute"
                />
              </template>
            </AttributesListItem>
          </HLDraggableAttribute>
        </template>
      </div>
    </div>

    <DraggedAttributes :draggable="activeDraggable" />
  </div>
</template>

<script setup lang="ts">
import { type HTMLAttributes, h, ref } from 'vue'
import AttributesListItem from '@/components/Attributes/AttributesListItem.vue'
import HLDraggableAttribute from '@/components/Attributes/HLDraggableAttribute.vue'
import VSpinner from '@/components/VSpinner.vue'
import { useInjectAttributesList } from '@/components/Attributes/attributesListInjection'
import DraggedAttributes from '@/components/Attributes/DraggedAttributes.vue'
import type { Draggable } from '@/components/DragAndDrop/useDraggable'

const props = withDefaults(defineProps<{
  spacingClass?: HTMLAttributes['class']
  disableAnimation?: boolean
  showIcon?: boolean
}>(), {
  spacingClass: 'px-4',
  disableAnimation: false,
  showIcon: false,
})

const NoItemsMessage = h('i', 'No attributes found')

const {
  attributes,
  filteredAttributes,
  isLoading,
  searchQuery,
  clearSearchQuery,
  dragSource,
} = useInjectAttributesList()!

const activeDraggable = ref<Draggable>()

function onDragStart(draggable: Draggable) {
  activeDraggable.value = draggable
}
function onDragEnd() {
  activeDraggable.value = undefined
}
</script>
