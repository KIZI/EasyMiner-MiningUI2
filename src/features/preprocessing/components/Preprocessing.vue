<template>
  <VContainer class="size-full max-h-[1000px] min-h-0 pb-20">
    <div class="grid h-full grid-cols-2 gap-x-2">
      <DatasourceFields class="min-h-0" />
      <MetasourceFields class="min-h-0" />
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import DatasourceFields from '@preprocessing/components/DatasourceFields.vue'
import MetasourceFields from '@preprocessing/components/MetasourceFields.vue'
import VContainer from '@/components/Layout/VContainer.vue'
</script>
