<template>
  <div class="flex items-center gap-x-3">
    <div class="grid h-8 w-8 place-items-center">
      <VSpinner
        class="h-full w-full p-1"
        :class="{'hidden': state !== 'in_progress'}"
      />
      <component
        :is="currentHint.icon.component"
        v-if="currentHint.icon && state !== 'in_progress'"
        class="h-full w-full"
        :class="currentHint.icon.class"
      />
    </div>
    <span class="text-md">{{ currentHint.text }}</span>
  </div>
</template>

<script setup lang="ts">
import clsx from 'clsx';
import { computed, defineAsyncComponent } from 'vue';
import type { ClassValue } from 'clsx';
import type { FunctionalComponent } from 'vue';
import type { MiningState } from '@/features/rulesMining/types/rulesMining.types';
import VSpinner from '@/components/VSpinner.vue';
import IconPhInfo from '~icons/ph/info';

const props = defineProps<{
  state: MiningState,
}>();

const currentHint = computed<{
  icon?: {
    component: FunctionalComponent,
    class?: ClassValue,
  },
  text: string,
}>(() => {
  switch (props.state) {
    case 'aborted':
      return {
        icon: {
          class: clsx('text-red-700'),
          component: defineAsyncComponent(() => import('~icons/ph/x-circle')),
        },
        text: 'Mining was aborted.',
      };

    case 'available':
      return {
        icon: {
          component: IconPhInfo,
        },
        text: 'You can now start mining or further modify the rule pattern.',
      };

    case 'disabled':
      return {
        icon: {
          component: IconPhInfo,
        },
        text: 'Create an association rule pattern to start mining.',
      };

    case 'failed':
      return {
        icon: {
          class: clsx('text-red-700'),
          component: defineAsyncComponent(() => import('~icons/ph/x-circle')),
        },
        text: 'Mining has failed! Please try modifying the rule pattern.',
      };

    case 'interrupted':
      return {
        icon: {
          class: clsx('text-red-700'),
          component: defineAsyncComponent(() => import('~icons/ph/x-circle')),
        },
        text: 'Mining was interrupted. Please try modifying the rule pattern.',
      };

    case 'no_rules_found':
      return {
        icon: {
          class: clsx('text-slate-600'),
          component: defineAsyncComponent(() => import('~icons/ph/x-circle')),
        },
        text: 'Mining has finished, but no rules were found! Try modifying the rule pattern.',
      };

    case 'solved':
      return {
        icon: {
          class: clsx('text-primary-600'),
          component: defineAsyncComponent(() => import('~icons/ph/check-circle')),
        },
        text: 'Mining has finished! Work with discovered rules, or modify the rule pattern.',
      };

    case 'blocked_by_interest_measures':
      return {
        icon: {
          class: clsx('text-slate-600'),
          component: defineAsyncComponent(() => import('~icons/ph/warning-circle')),
        },
        text: 'Save interest measures to start mining.',
      };

    case 'new':
    case 'in_progress':
    default:
      return {
        text: 'Mining is in progress, it may take a while to get the results.',
      };
  }
});
</script>
