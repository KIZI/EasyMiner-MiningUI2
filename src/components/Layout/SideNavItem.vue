<template>
  <button
    class="group flex w-full items-start rounded-md px-4 py-2 text-left text-sm font-semibold" :class="{
      'text-gray-900': !isActive,
      'hover:bg-subtle-white': !isActive && isAvailable,
      'opacity-50': !isAvailable,
      'bg-subtle-white text-primary-800': isActive,
    }"
    :disabled="isActive || !isAvailable"
  >
    <component
      :is="icon" class="-mt-0.5 mr-3 size-6 shrink-0" :class="{
        'text-slate-700': !isActive,
        'text-primary-700': isActive,
      }"
    />
    <span class="flex min-w-0 flex-col items-start gap-y-1">
      <span class="w-full truncate">
        {{ label }}
      </span>
      <span v-if="description" class="w-full truncate font-medium text-gray-900">
        {{ description }}
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(defineProps<{
  label: string
  description?: string
  icon: Component
  isActive?: boolean
  isAvailable?: boolean
}>(), {
  isAvailable: true,
})
</script>
