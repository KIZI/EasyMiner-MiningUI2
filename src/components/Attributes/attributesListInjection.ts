import { inject, provide } from 'vue'
import type { AttributesList } from '@/components/Attributes/useAttributesList'

// export const [
//   useProvideAttributesList,
//   useInjectAttributesList,
// ] = createInjectionState((attributesList: AttributesList) => attributesList);

const attributesListInjectionSymbol = Symbol('attributesList')

export function useProvideAttributesList(attributesList: any) {
  provide(attributesListInjectionSymbol, attributesList)
}

export function useInjectAttributesList() {
  return inject(attributesListInjectionSymbol) as AttributesList
}
