<template>
  <div class="mt-auto pb-6">
    <div class="flex items-start gap-x-7">
      <div class="font-semibold">
        Interest measures
      </div>
      <div class="flex items-start gap-x-3 transition-opacity">
        <InterestMeasureItemForm
          v-for="item in activeItems"
          :key="item.name"
          :item="item"
        />

        <div
          v-if="!editedItem"
          class="min-w-[max-content]"
        >
          <InterestMeasureItemForm v-if="isFormActive" />
          <button
            v-if="unusedItems.length && !isFormActive"
            class="flex h-8 items-center gap-x-2 rounded-md border border-transparent bg-white px-2 text-sm"
            @click="isFormActive = true"
          >
            <icon-ph-plus :width="22" />
            <span class="font-medium">Add interest measure</span>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-4 flex items-end gap-x-4">
      <SwitchGroup
        as="span"
        class="inline-flex items-center gap-x-2"
      >
        <VSwitch v-model="isPruningEnabled" />
        <SwitchLabel class="text-sm font-medium">
          Pruning
        </SwitchLabel>
      </SwitchGroup>
      <p
        class="text-xs leading-5"
        :class="{ 'invisible': !isPruningEnabled }"
      >
        Removes deductive rules
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SwitchGroup, SwitchLabel } from '@headlessui/vue';
import { storeToRefs } from 'pinia';
import InterestMeasureItemForm from './InterestMeasureItemForm.vue';
import { VSwitch } from '@/components/Form';
import { useInterestMeasuresStore } from '@/features/rulesMining/stores/interestMeasuresStore';

const {
  activeItems,
  unusedItems,
  isPruningEnabled,
  isFormActive,
  editedItem,
} = storeToRefs(useInterestMeasuresStore());
</script>
