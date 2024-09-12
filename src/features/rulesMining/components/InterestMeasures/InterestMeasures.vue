<template>
  <div>
    <div class="flex items-start gap-x-10">
      <div class="shrink-0 font-semibold">
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

    <div class="mt-4 flex-col">
      <PopoverRoot v-model:open="isPruningHelpOpen" as-tooltip>
        <PopoverPortal>
          <PopoverContent
            :align-offset="-8"
            :side-offset="6"
            align="start"
            side="right"
            class=""
            :class="[
              'z-[110]',
              'animation-duration-300',
              'data-[state=open]:animate-in',
              'data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0',
              'data-[state=open]:fade-in-0',
              'data-[state=open]:data-[side=bottom]:slide-in-from-top-1',
              'data-[state=open]:data-[side=left]:slide-in-from-right-1',
              'data-[state=open]:data-[side=right]:slide-in-from-left-1',
              'data-[state=open]:data-[side=top]:slide-in-from-bottom-1',
              'data-[state=closed]:data-[side=bottom]:slide-out-to-top-1',
              'data-[state=closed]:data-[side=left]:slide-out-to-right-1',
              'data-[state=closed]:data-[side=right]:slide-out-to-left-1',
              'data-[state=closed]:data-[side=top]:slide-out-to-bottom-1',
            ]"
          >
            <div class="max-w-md text-pretty rounded-md bg-white py-1.5 pl-2 pr-3 shadow-lg ring-1 ring-black/10">
              <div class="flex gap-x-2.5 text-sm font-medium">
                <icon-ph-info class="mt-0.5 size-5 shrink-0 text-primary-800" />
                Rule pruning is possible only when consequent contains exactly one attribute with unrestricted (*) values.
              </div>
            </div>

            <PopoverArrow class="fill-primary-700/50" :width="14" :height="7" />
          </PopoverContent>
        </PopoverPortal>
        <PopoverTrigger
          class="group/trigger inline-flex outline-none"
          tabindex="-1"
        >
          <SwitchGroup
            as="span"
            class="inline-flex items-start"
          >
            <VSwitch
              v-model="pruning"
              class="mt-0.5"
              :class="{ 'opacity-85': !isPruningAvailable }"
              :disabled="!isPruningAvailable"
            />
            <SwitchLabel
              class="select-none pl-3 text-left text-sm font-medium leading-tight"
              :class="{
                'cursor-pointer': isPruningAvailable,
                'cursor-help decoration-dotted decoration-from-font group-hover/trigger:underline': !isPruningAvailable,
              }"
            >
              Prune rules
              <div class="text-xs text-gray-600">
                and build classifier
              </div>
            </SwitchLabel>
          </SwitchGroup>
        </PopoverTrigger>
      </PopoverRoot>

      <div class="mt-3 flex items-center gap-x-1">
        <div class="text-sm">
          Rules limit:
        </div>
        <input
          v-model="rulesLimit"
          v-maska
          data-maska="10000"
          data-maska-tokens="1:[1-9]|0:[0-9]:optional"
          type="text"
          inputmode="decimal"
          :class="[
            'w-12 rounded p-0.5 text-sm font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
            'border-transparent hover:border-blue-300',
          ]"
          @change="handleRulesLimitChange"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { vMaska } from 'maska'
import { SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { useInterestMeasuresStore } from '@rulesMining/stores/interestMeasuresStore'
import { PopoverArrow, PopoverContent, PopoverPortal } from 'radix-vue'
import { computed, ref, watchEffect } from 'vue'
import { createReusableTemplate, until } from '@vueuse/core'
import InterestMeasureItemForm from './InterestMeasureItemForm.vue'
import { VSwitch } from '@/components/Form'
import VButton from '@/components/VButton.vue'
import PopoverRoot from '@/components/RadixPopover/PopoverRoot.vue'
import PopoverTrigger from '@/components/RadixPopover/PopoverTrigger.vue'

const {
  activeMeasures,
  availableMeasures,
  pruning,
  isFormActive,
  editedMeasure,
  canAddMeasure,
  isPruningAvailable,
  rulesLimit,
} = storeToRefs(useInterestMeasuresStore())

const _isPruningHelpOpen = ref(false)
const isPruningHelpOpen = computed({
  get() {
    return _isPruningHelpOpen.value
  },
  set(value) {
    if (isPruningAvailable.value) return
    _isPruningHelpOpen.value = value
  },
})

;(async () => {
  await until(() => !isPruningAvailable.value && pruning.value).toBe(true)
  isPruningHelpOpen.value = true
})()

function handleRulesLimitChange() {
  if (!rulesLimit.value) {
    rulesLimit.value = 1000
  }
}
</script>
