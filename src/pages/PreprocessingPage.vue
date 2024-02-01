<template>
  <VContainer class="h-full max-h-[1000px] min-h-0 w-full pb-20">
    <div class="grid h-full grid-cols-2 gap-x-2">
      <DatasourceFields class="min-h-0" />
      <MetasourceFields class="min-h-0" />
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import VContainer from '@/components/Layout/VContainer.vue';
import DatasourceFields from '@preprocessing/components/DatasourceFields.vue';
import MetasourceFields from '@preprocessing/components/MetasourceFields.vue';
</script>
