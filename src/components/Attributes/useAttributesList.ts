import { sortBy } from 'lodash-es'
import {
  type Ref,
  computed,
  ref,
  toRef,
  watch,
} from 'vue'
import { whenever } from '@vueuse/core'
import type { DragSource } from '@/components/DragAndDrop/dragAndDropStore'
import { useSelectionModel } from '@/composables/useSelectionModel'
import type { DatasourceColumnType } from '@/api/datasources/types'

export type UseAttributesListOptions<Attribute extends ListAttribute> = {
  attributes: Ref<Attribute[]>
  selection?: Ref<Attribute[]>
  isLoading?: Ref<boolean>
  dragSource?: DragSource
  disableSelection?: boolean
}

export type ListAttribute = {
  id: number
  name: string
  isAvailable: boolean
  type: DatasourceColumnType
  source: 'datasource' | 'metasource'
}

export type AttributesList = ReturnType<typeof useAttributesList>

export function useAttributesList<Attribute extends ListAttribute>(options: UseAttributesListOptions<Attribute>) {
  const { attributes, isLoading, dragSource } = options

  const searchQuery = ref('')
  const selectionModel = useSelectionModel({
    items: attributes,
    selection: options.selection,
    itemIdentity: item => item.id,
  })
  const selection = toRef(selectionModel, 'selection')

  const shouldShowSearch = ref(false)
  const shouldShowSelection = ref(false)

  const sortedAttributes = computed(() => sortBy(attributes.value, [
    attribute => !attribute.isAvailable,
    attribute => attribute.name.toLowerCase(),
  ]),
  )

  const filteredAttributes = computed(() => {
    if (searchQuery.value) {
      return sortedAttributes.value.filter((attribute: any) => attribute.name.toLowerCase().startsWith(searchQuery.value.toLowerCase()))
    }

    return sortedAttributes.value
  })

  const availableAttributes = computed(() => attributes.value.filter(attribute => attribute.isAvailable))
  const isSelectionDisabled = computed(() => !availableAttributes.value.length)

  whenever(isSelectionDisabled, () => {
    shouldShowSelection.value = false
  })

  const isInteractive = computed(() => {
    return options.dragSource || shouldShowSelection.value
  })

  function toggleSelection() {
    shouldShowSelection.value = !shouldShowSelection.value
    selectionModel.clear()
  }

  function toggleSearch() {
    shouldShowSearch.value = !shouldShowSearch.value
    if (!shouldShowSearch.value) clearSearchQuery()
  }

  function clearSearchQuery() {
    searchQuery.value = ''
  }

  return {
    attributes,
    isLoading,
    dragSource,
    clearSearchQuery,
    filteredAttributes,
    selection,
    selectionModel,
    isSelectionDisabled,
    isInteractive,
    searchQuery,
    shouldShowSearch,
    shouldShowSelection,
    toggleSelection,
    toggleSearch,
    disableSelection: options.disableSelection,
  }
}
