import { omit } from 'lodash-es';
import { computed, useAttrs, type SetupContext } from 'vue';

export function useAttrsExcludingClass() {
  const attrs = useAttrs();

  const attrsExcludingClass = computed(() => omit(attrs, 'class') as SetupContext['attrs']);

  return {
    attrs,
    attrsExcludingClass,
  };
}
