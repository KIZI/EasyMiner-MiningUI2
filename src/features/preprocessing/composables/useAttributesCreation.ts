import { computed, reactive } from 'vue';
import type { DatasourceColumn } from '@/api/datasources/types';

type DataFieldCreationState = 'opened' | 'in_progress' | 'success' | 'error';

export type AttributeCreationSource = DatasourceColumn|DatasourceColumn[];

const attributesCreationStateMap = reactive<Map<AttributeCreationSource, DataFieldCreationState>>(new Map());

export function useAttributesCreation() {
  const creations = computed(() => {
    return Array.from(attributesCreationStateMap.keys());
  });

  function open(source: AttributeCreationSource) {
    attributesCreationStateMap.set(source, 'opened');
  }

  function getState(source: AttributeCreationSource) {
    return attributesCreationStateMap.get(source);
  }

  function close(source: AttributeCreationSource) {
    attributesCreationStateMap.delete(source);
  }

  return {
    open,
    creations,
    getState,
    close,
  };
}

// window.parent.postMessage({
//   type: 'add-attribute',
//   state: 'started',
//   column: 29550,
//   attributeName: 'amount_equifrequent_5',
// });

// window.parent.postMessage({
//   type: 'add-attribute',
//   state: 'done',
//   column: 29550,
//   attributeName: 'amount_equifrequent_5',
// });

// window.parent.postMessage({
//   type: 'add-attribute',
//   state: 'failed',
//   column: 29550,
//   attributeName: 'amount_equifrequent_5',
// });

// window.addEventListener('message', (event) => {
//   window.event = event;
// });

// window.parent.postMessage({
//   type: 'add-attribute',
//   state: 'started',
//   column: 29550, // id zdrojového sloupce
//   attributeName: 'amount_equifrequent_5', // název vytvářeného atributu
// });

// window.parent.postMessage({
//   type: 'add-attribute',
//   state: 'started',
//   columnNames: 'amount,birth_number,District', // jména zdrojových sloupců
// });
