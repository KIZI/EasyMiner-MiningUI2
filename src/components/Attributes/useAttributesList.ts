import { sortBy } from 'lodash-es';
import {
  ref, computed, type Ref, watchEffect,
} from 'vue';
import type { DragSource } from '@/components/DragAndDrop/dragAndDropStore';
import { useSelectionModel } from '@/composables/useSelectionModel';
import type { DatasourceColumnType } from '@/api/datasources/types';

export type UseAttributesListOptions<Attribute extends ListAttribute> = {
  attributes: Ref<Attribute[]>;
  selection?: Ref<Attribute[]>;
  isLoading?: Ref<boolean>;
  dragSource?: DragSource,
};

export type ListAttribute = {
  id: number;
  name: string;
  isAvailable: boolean;
  type: DatasourceColumnType;
};

export type AttributesList = ReturnType<typeof useAttributesList>;

export function useAttributesList<Attribute extends ListAttribute>(options: UseAttributesListOptions<Attribute>) {
  const { attributes, isLoading, dragSource } = options;

  const searchQuery = ref('');
  const selection = useSelectionModel({ items: attributes, modelValue: options.selection });

  const shouldShowSearch = ref(false);
  const shouldShowSelection = ref(false);

  const sortedAttributes = computed(() => sortBy(attributes.value, [
    (attribute) => !attribute.isAvailable,
    (attribute) => attribute.name.toLowerCase()]),
  );

  const filteredAttributes = computed(() => {
    if (searchQuery.value) {
      return sortedAttributes.value.filter((attribute: any) => attribute.name.toLowerCase().startsWith(searchQuery.value.toLowerCase()));
    }

    return sortedAttributes.value;
  });

  const availableAttributes = computed(() => filteredAttributes.value.filter((attribute) => attribute.isAvailable));
  const isSelectionDisabled = computed(() => !availableAttributes.value.length);

  function toggleSelection() {
    shouldShowSelection.value = !shouldShowSelection.value;
    selection.clearSelection();
  }

  function toggleSearch() {
    shouldShowSearch.value = !shouldShowSearch.value;
  }

  function clearSearchQuery() {
    searchQuery.value = '';
  }

  return {
    attributes,
    isLoading,
    dragSource,
    clearSearchQuery,
    filteredAttributes,
    selection,
    isSelectionDisabled,
    searchQuery,
    shouldShowSearch,
    shouldShowSelection,
    toggleSelection,
    toggleSearch,
  };
}
