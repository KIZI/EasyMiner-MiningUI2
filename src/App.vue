<template>
  <div class="grid h-full grid-rows-[auto_1fr]">
    <AppHeader />
    <TheBackdrop />
    <main class="-mt-6 grid min-h-0 xl:-mt-10">
      <router-view />
    </main>
    <AttributeHistogramModal />
  </div>
  <div class="drag-overlay absolute inset-0 z-40 hidden" />
  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import AppHeader from '@/components/Layout/AppHeader.vue'
import { TheBackdrop } from '@/components/Backdrop'
import AttributeHistogramModal from '@/components/Attributes/AttributeHistogramModal.vue'
</script>
