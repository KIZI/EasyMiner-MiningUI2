<template>
  <VExpandable :is-expanded="shouldShowSearch">
    <div v-bind="$attrs">
      <div class="p-px">
        <AttributesListSearchInput />
      </div>
    </div>
  </VExpandable>
</template>

<script setup lang="ts">
import AttributesListSearchInput from '@/components/Attributes/AttributesListSearchInput.vue'
import { useInjectAttributesList } from '@/components/Attributes/attributesListInjection'
import VExpandable from '@/components/VExpandable.vue'

defineOptions({
  inheritAttrs: false,
})

const { shouldShowSearch } = useInjectAttributesList()!
</script>
