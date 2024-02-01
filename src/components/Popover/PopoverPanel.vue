<template>
  <div v-if="isVisible">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useInjectPopoverState } from './popoverInjectionState';

const { isVisible } = useInjectPopoverState()!;
</script>
