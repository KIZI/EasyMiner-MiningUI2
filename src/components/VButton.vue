<template>
  <button
    v-bind="attrsExcludingClass"
    :class="buttonClass"
    :disabled="isDisabled"
  >
    <span
      v-if="$slots.icon || loading"
      class="relative"
    >
      <span :class="{'opacity-0': loading}">
        <slot name="icon" />
      </span>

      <VSpinner
        v-if="loading"
        :class="{
          '-ml-1 mr-1.5 h-[1em] w-[1em]': !$slots.icon,
          'absolute inset-0 h-full w-full p-px': $slots.icon,
        }"
      />
    </span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import clsx from 'clsx';
import { computed, toRefs } from 'vue';
import { useAttrsExcludingClass } from '@/composables/useAttrsExcludingClass';
import { useDefaultTwClass } from '@/composables/useDefaultTwClass';
import VSpinner from '@/components/VSpinner.vue';

defineOptions({ inheritAttrs: false });

type VButtonVariant = 'primary' |
'ghost' |
'basic' |
'danger' |
'primary-light' |
'danger-light' |
'danger-outline-light';

type VButtonSize = 'xs' |
'sm' |
'md' |
'lg' |
'xl';

const props = withDefaults(defineProps<{
  variant?: VButtonVariant,
  size?: VButtonSize,
  disabled?: boolean,
  loading?: boolean,
}>(), {
  variant: 'basic',
  disabled: false,
  loading: false,
  size: undefined,
});

const { variant, size, disabled, loading } = toRefs(props);

const { attrsExcludingClass } = useAttrsExcludingClass();
const { defaultTwClass } = useDefaultTwClass();

const isDisabled = computed(() => loading.value || disabled.value);

const buttonClass = computed(() => {
  const base = clsx([
    'relative inline-flex items-center justify-center rounded border leading-normal shadow-sm',
    'outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2',
  ]);

  const disabledClass = clsx({
    'opacity-75 cursor-not-allowed': disabled.value,
  });

  const loadingClass = clsx({
    'pointer-events-none animate-pulse-subtle': loading.value,
  });

  const variants = {
    'basic': clsx('border-gray-300 bg-white text-gray-700 hover:bg-slate-50 focus-visible:ring-gray-300'),
    'danger': clsx('border-transparent bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-700'),
    'ghost': clsx('border-transparent bg-transparent text-gray-900 shadow-none hover:bg-slate-50 hover:shadow-sm focus-visible:ring-gray-600 focus-visible:ring-offset-0'),
    'primary': clsx('border-transparent bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500'),

    'primary-light': clsx('border-primary-200 bg-primary-100 py-0.5 text-primary-700 hover:bg-primary-200 focus-visible:ring-primary-200'),
    'danger-light': clsx('border-red-200 bg-red-50 py-0.5 text-red-700 hover:bg-red-100 focus-visible:ring-red-200'),
    'danger-outline-light': clsx('border-red-400 py-0.5 text-red-700 hover:bg-red-50 focus-visible:ring-red-300'),
  } satisfies Record<VButtonVariant, string>;

  const sizes = {
    xs: clsx('px-2 py-0.5 text-xs'),
    sm: clsx('px-2 py-1 text-xs'),
    md: clsx('px-3 py-1.5 text-sm leading-4'),
    lg: clsx('px-4 py-2 text-sm font-medium'),
    xl: clsx('px-6 py-3 text-base font-medium'),
  } satisfies Record<VButtonSize, string>;

  const sizeClass = size.value && sizes[size.value];
  const variantClass = variants[variant.value];

  return defaultTwClass(
    base,
    sizeClass,
    variantClass,
    disabledClass,
    loadingClass,
  );
});
</script>
