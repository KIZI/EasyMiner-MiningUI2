<template>
  <div
    class="grid transition-all"
    :class="{
      'grid-rows-[0fr]': !isExpanded,
      'grid-rows-[1fr]': isExpanded,
    }"
  >
    <div class="overflow-hidden">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isExpanded: Boolean,
});
</script>
