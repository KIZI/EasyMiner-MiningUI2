<template>
  <div class="grid h-full grid-rows-[auto_1fr]">
    <AppHeader />
    <TheBackdrop />
    <main class="-mt-10 grid min-h-0">
      <router-view />
    </main>
    <AttributeHistogramModal />
  </div>
  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import AppHeader from '@/components/Layout/AppHeader.vue'
import { TheBackdrop } from '@/components/Backdrop'
import AttributeHistogramModal from '@/components/Attributes/AttributeHistogramModal.vue'
</script>
