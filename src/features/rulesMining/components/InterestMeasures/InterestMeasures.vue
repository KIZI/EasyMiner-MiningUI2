<template>
  <div class="mt-auto pb-6">
    <div class="flex items-start gap-x-7">
      <div class="font-semibold">
        Interest measures
      </div>
      <div class="flex items-start gap-x-3 transition-opacity">
        <InterestMeasureItemForm
          v-for="item in activeMeasures"
          :key="item.name"
          :item="item"
        />

        <div
          v-if="!editedMeasure"
          class="min-w-max"
        >
          <InterestMeasureItemForm v-if="isFormActive" />
          <VButton
            v-if="availableMeasures.length && canAddMeasure && !isFormActive"
            variant="ghost"
            class="flex h-8 items-center gap-x-2 px-2 text-sm"
            @click="isFormActive = true"
          >
            <icon-ph-plus :width="22" />
            <span class="font-medium">Add interest measure</span>
          </VButton>
        </div>
      </div>
    </div>

    <div class="mt-4 flex items-end gap-x-4">
      <SwitchGroup
        as="span"
        class="inline-flex items-center gap-x-3"
        :class="{ 'opacity-50': !isPruningAvailable }"
        title="Only available for classification tasks. (One attribute in consequent with any value)"
      >
        <VSwitch v-model="pruning" :disabled="!isPruningAvailable" />
        <SwitchLabel class="text-sm font-medium" :class="{ 'cursor-pointer': isPruningAvailable }">
          Rule pruning
        </SwitchLabel>
      </SwitchGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import InterestMeasureItemForm from './InterestMeasureItemForm.vue'
import { VSwitch } from '@/components/Form'
import { useInterestMeasuresStore } from '@/features/rulesMining/stores/interestMeasuresStore'
import VButton from '@/components/VButton.vue'

const {
  activeMeasures,
  availableMeasures,
  pruning,
  isFormActive,
  editedMeasure,
  canAddMeasure,
  isPruningAvailable,
} = storeToRefs(useInterestMeasuresStore())
</script>
