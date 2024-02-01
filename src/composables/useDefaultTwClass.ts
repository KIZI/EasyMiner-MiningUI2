import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { computed, useAttrs } from 'vue';
import type { ClassArray } from 'clsx';

export const useDefaultTwClass = () => {
  const attrs = useAttrs();
  const receivedClass = computed(() => attrs.class as any);

  function defaultTwClass(...className: ClassArray) {
    return twMerge(clsx(className), clsx(receivedClass.value));
  }

  return {
    defaultTwClass,
  };
};
