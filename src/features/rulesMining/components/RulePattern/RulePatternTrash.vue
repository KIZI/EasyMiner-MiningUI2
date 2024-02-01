<template>
  <div
    ref="dropZoneRef"
    class="
        flex h-12 items-center gap-x-2 rounded border-2 border-dashed border-red-400
        px-5 text-sm text-red-800 transition-all
      "
    :class="{
      'pointer-events-none opacity-0': !dropZone.isAvailable.value,
      'opacity-100': dropZone.isAvailable.value,
      'bg-red-100': dropZone.isDraggedOver.value,
    }"
  >
    <icon-ph-trash :width="30" />
    <span class="font-medium">Drop here to remove</span>
  </div>
</template>

<script lang="ts" setup>
import { useDropZone } from '@/components/DragAndDrop/useDropZone';
import { useRulePatternStore } from '@/features/rulesMining/stores/rulePatternStore';
import { DRAG_SOURCE } from '@/components/DragAndDrop/dragAndDropStore';
import type { MetasourceAttribute } from '@/api/metasources/types';

const rulePatternStore = useRulePatternStore();
const dropZone = useDropZone<MetasourceAttribute>({
  accepts: [DRAG_SOURCE.antecedent, DRAG_SOURCE.consequent],
  onDrop: (attribute) => {
    rulePatternStore.removeItemById(attribute.id);
  },
});
const { dropZoneRef } = dropZone;
</script>
