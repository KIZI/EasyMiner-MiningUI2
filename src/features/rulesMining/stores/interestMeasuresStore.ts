import { interestMeasureTypes, interestMeasures } from '@rulesMining/types/interestMeasure.types';
import { interestMeasureToIMSimpleInput } from '@rulesMining/utils/rulesMining';
import { defineStore, storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import type { InteresetMeasureActiveItem, InterestMeasure, InterestMeasureItem } from '@rulesMining/types/interestMeasure.types';

export const useInterestMeasuresStore = defineStore('interestMeasures', () => {
  const isFormActive = ref(false);
  const editedItem = ref<InterestMeasure|null>(null);

  function openItemForm(name: InterestMeasure) {
    editedItem.value = name;
    isFormActive.value = true;
  }

  function closeItemForm() {
    editedItem.value = null;
    isFormActive.value = false;
  }

  const isPruningEnabled = ref(false);

  const itemsMap = ref(new Map<InterestMeasure, InterestMeasureItem>([
    [interestMeasures.Conf, {
      description: 'How likely is consequent to be present given that antecedent is present',
      isRequired: false,
      label: 'Confidence',
      name: interestMeasures.Conf,
      range: {
        from: { value: 0 },
        to: { closed: true, value: 1 },
      },
      type: interestMeasureTypes.Double,
      defaultValue: 0.7,
      value: 0.7,
    }],
    [interestMeasures.Support, {
      description: 'How frequent is antecedent in dataset',
      isRequired: false,
      label: 'Support',
      name: interestMeasures.Support,
      range: {
        from: { value: 0 },
        to: { closed: true, value: 1 },
      },
      type: interestMeasureTypes.Double,
      defaultValue: 0.05,
      value: 0.05,
    }],
    [interestMeasures.Lift, {
      defaultValue: 1.1,
      description: 'Ratio of consequent presence when antecedent is present',
      label: 'Lift',
      name: interestMeasures.Lift,
      range: {
        from: { value: 0 },
        to: { value: 5 },
      },
      type: interestMeasureTypes.Double,
    }],
    [interestMeasures.Length, {
      defaultValue: 5,
      description: 'Length of searched rules',
      label: 'Rule length',
      name: interestMeasures.Length,
      range: {
        from: { closed: true, value: 1 },
        to: { closed: true, value: 10 },
      },
      type: interestMeasureTypes.Integer,
    }],
  ]));

  const items = computed(() => Array.from(itemsMap.value.values()));
  const activeItems = computed(() => (
    items.value.filter((item) => item.value) as InteresetMeasureActiveItem[]
  ));

  const unusedItems = computed(() => items.value.filter((item) => !item.value));

  const interestMeasuresInput = computed(() => (
    activeItems.value.map(interestMeasureToIMSimpleInput)
  ));

  function getItem(name: InterestMeasure) {
    return itemsMap.value.get(name);
  }

  function setItemValue(name: InterestMeasure, value: number|null) {
    const measure = itemsMap.value.get(name);
    if (!measure) return;
    measure.value = value;
  }

  function clearItemValue(name: InterestMeasure) {
    setItemValue(name, null);
  }

  return {
    unusedItems,
    isPruningEnabled,
    activeItems,
    items,
    getItem,
    setItemValue,
    clearItemValue,
    interestMeasuresInput,
    isFormActive,
    editedItem,
    closeItemForm,
    openItemForm,
  };
});

export const useInterestMeasuresStoreRefs = () => storeToRefs(useInterestMeasuresStore());
