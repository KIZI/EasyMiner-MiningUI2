<template>
  <Popover
    v-model:open="isOpen"
    class="inline-flex"
  >
    <PopoverButton>
      <template #trigger="{ events }">
        <slot v-bind="{ events, isOpen }" />
      </template>
    </PopoverButton>

    <FadeTransition :duration="250">
      <PopoverPanel :class="panelClass" class="absolute z-20 mb-0 w-max">
        <div :class="contentClass" class="rounded-md bg-white shadow-lg ring-1 ring-primary-600">
          <div class="space-x-2">
            <VButton
              variant="basic"
              size="sm"
              class="gap-x-2 text-xs font-semibold"
              @click="handleSelect('Antecedent')"
            >
              <icon-ph-plus-bold />
              Ant.
            </VButton>
            <VButton
              variant="basic"
              size="sm"
              class="gap-x-2 text-xs font-semibold"
              @click="handleSelect('Consequent')"
            >
              <icon-ph-plus-bold />
              Con.
            </VButton>
          </div>
        </div>
      </PopoverPanel>
    </FadeTransition>
  </Popover>
</template>

<script setup lang="ts">
import type { Cedent } from '@rulesMining/types/rulePattern.types'
import { ref } from 'vue'
import { Popover, PopoverButton, PopoverPanel } from '@/components/Popover'
import VButton from '@/components/VButton.vue'
import FadeTransition from '@/components/Transitions/FadeTransition.vue'

defineProps<{
  panelClass?: string
  contentClass?: string
}>()

const emit = defineEmits<{
  select: [cedent: Cedent]
}>()

const isOpen = ref(false)

function handleSelect(cedent: Cedent) {
  emit('select', cedent)
  isOpen.value = false
}
</script>
