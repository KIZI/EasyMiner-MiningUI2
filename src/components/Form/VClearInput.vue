<template>
  <div class="relative grid items-center">
    <slot />
    <button
      v-if="modelValue"
      title="Clear"
      class="absolute right-0 h-full pr-2"
      @click="modelValue = ''"
    >
      <icon-ph-x :width="18" />
    </button>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<string>()
</script>
