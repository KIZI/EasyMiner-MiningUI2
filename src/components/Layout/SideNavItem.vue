<template>
  <button
    class="group flex w-full items-center rounded-md px-4 py-2 text-sm font-semibold" :class="{
      'text-gray-900': !isActive,
      'hover:bg-subtle-white': !isActive && isAvailable,
      'opacity-50': !isAvailable,
      'bg-subtle-white text-primary-800': isActive,
    }"
    :disabled="isActive || !isAvailable"
  >
    <component
      :is="icon" class="mr-3 size-6 shrink-0" :class="{
        'text-slate-700': !isActive,
        'text-primary-700': isActive,
      }"
    />
    <span class="truncate">
      {{ label }}
    </span>
  </button>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(defineProps<{
  label: string
  icon: Component
  isActive?: boolean
  isAvailable?: boolean
}>(), {
  isAvailable: true,
})
</script>
