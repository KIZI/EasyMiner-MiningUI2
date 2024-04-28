import { omit } from 'lodash-es'
import { type SetupContext, computed, useAttrs } from 'vue'

export function useAttrsExcludingClass() {
  const attrs = useAttrs()

  const attrsExcludingClass = computed(() => omit(attrs, 'class') as SetupContext['attrs'])

  return {
    attrs,
    attrsExcludingClass,
  }
}
