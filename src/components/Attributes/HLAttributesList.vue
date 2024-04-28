<template>
  <slot />
</template>

<script setup lang="ts" generic="Attribute extends ListAttribute">
import { toRefs } from 'vue'
import { type ListAttribute, useAttributesList } from '@/components/Attributes/useAttributesList'
import type { DragSource } from '@/components/DragAndDrop/dragAndDropStore'
import { useProvideAttributesList } from '@/components/Attributes/attributesListInjection'

const props = defineProps<{
  attributes: Attribute[]
  isLoading?: boolean
  dragSource?: DragSource
}>()

const { dragSource } = props
const { attributes, isLoading } = toRefs(props)
const selection = defineModel<Attribute[]>('selection', { default: [] })

const attributesList = useAttributesList({
  attributes,
  dragSource,
  isLoading,
  selection,
})
useProvideAttributesList(attributesList)
</script>
