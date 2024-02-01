<template>
  <SectionCard class="relative min-h-[350px] pb-5 pt-4 [&>*]:px-6">
    <div class="flex items-center justify-between">
      <SectionTitle>Selected rules</SectionTitle>

      <div class="-mr-2 flex items-center gap-x-1">
        <VButton
          variant="ghost"
          size="xs"
          class="shrink-0 gap-x-1.5"
        >
          <icon-ph-lightning class="h-5 w-5" />
          Test model
        </VButton>

        <button class="inline-flex items-center gap-x-2 px-2 text-xs hover:underline">
          <icon-ph-note-pencil-light class="h-5 w-5" />
          Rules editor
        </button>
        <button class="inline-flex items-center gap-x-2 px-2 text-xs hover:underline">
          <icon-ph-lightbulb class="h-5 w-5" />
          Knowledge experiment
        </button>
      </div>
    </div>

    <div class="flex items-center">
      <div class="mr-4 break-all text-lg text-primary-900">
        {{ ruleSet?.name }}
      </div>

      <Popover>
        <PopoverButton
          :as="VButton"
          variant="ghost"
          class="p-1.5"
        >
          <icon-ph-note-pencil-light class="h-5 w-5" />
        </PopoverButton>
        <EditRuleSetPopoverForm :rule-set="ruleSet" />
      </Popover>
      <Popover>
        <PopoverButton
          :as="VButton"
          variant="ghost"
          class="gap-x-2 p-1.5 text-sm"
        >
          <icon-ph-plus-square-light class="h-5 w-5" />
        </PopoverButton>
        <EditRuleSetPopoverForm />
      </Popover>

      <ChangeRuleSetListbox />
    </div>

    <div
      v-if="!hasRules"
      class="grid h-full place-items-center text-gray-600"
    >
      <div class="flex gap-x-3">
        <icon-ph-info class="h-6 w-6" />
        Add interesting discovered rules
      </div>
    </div>

    <div v-if="hasRules">
      <div class="mt-7 flex items-center gap-x-6">
        <div class="flex items-center gap-x-2">
          <span class="text-xs">Order by:</span>
          <select
            v-model="order"
            class="rounded border-gray-300 bg-[right_0.2rem_center] px-2 py-0.5 pr-7 text-xs font-medium leading-normal shadow-sm focus:border-blue-200 focus:ring-blue-200"
          >
            <option
              v-for="size in orderOptions"
              :key="size.value"
              :value="size.value"
            >
              {{ size.label }}
            </option>
          </select>
        </div>

        <div class="flex h-7 grow items-center">
          <VButton
            variant="ghost"
            size="sm"
            class="mr-2 shrink-0 gap-x-2 text-xs"
            @click="showSearch = !showSearch"
          >
            <template #icon>
              <icon-ph-magnifying-glass class="h-4 w-4 text-slate-700" />
            </template>
            <template v-if="!showSearch">
              Search rules
            </template>
          </VButton>

          <template v-if="showSearch">
            <div class="relative flex w-full items-center">
              <VInput
                class="h-7 pl-2 pr-6 text-xs"
                placeholder="Antecedent"
              />
              <button class="absolute right-2">
                <icon-ph-x class="h-3.5 w-3.5 text-slate-700" />
              </button>
            </div>
            <div class="mx-2.5 text-lg">
              →
            </div>
            <div class="relative flex w-full items-center">
              <VInput
                class="h-7 pl-2 pr-6 text-xs"
                placeholder="Consequent"
              />
              <button class="absolute right-2">
                <icon-ph-x class="h-3.5 w-3.5 text-slate-700" />
              </button>
            </div>
          </template>
        </div>
      </div>

      <div class="mt-3">
        <RuleSetRules
          v-model:selection="selection"
          :rules="rules"
        />
      </div>

      <div class="mt-10">
        <div class="grid grid-cols-[1fr_auto_1fr] items-center">
          <RulesSelectionActions
            v-model:selection="selection"
            :rules="rules"
          />
          <div class="mx-auto">
            <VPagination
              :total-pages="10"
              :current-page="1"
            />
          </div>
          <div class="ml-auto">
            <div class="flex items-center space-x-3">
              <button class="inline-flex items-center gap-x-2 text-xs hover:underline">
                <icon-ph-export class="h-4 w-4 text-gray-700" />
                Export ruleset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useRuleSetRulesQuery } from '@/api/ruleSets/useRuleSetRulesQuery';
import type { TaskRule } from '@/api/tasks/types';

import { useSelectedRulesStoreRefs } from '@selectedRules/stores/selectedRulesStore';
import EditRuleSetPopoverForm from '@selectedRules/components/EditRuleSetPopoverForm.vue';
import ChangeRuleSetListbox from '@selectedRules/components/ChangeRuleSetListbox.vue';
import RuleSetRules from '@selectedRules/components/RuleSetRules.vue';

import SectionCard from '@/components/Layout/SectionCard.vue';
import SectionTitle from '@/components/Layout/SectionTitle.vue';
import RulesSelectionActions from '@/components/Rules/RulesSelectionActions.vue';
import { Popover, PopoverButton } from '@/components/Popover';
import VButton from '@/components/VButton.vue';
import VPagination from '@/components/VPagination.vue';
import VInput from '@/components/Form/VInput.vue';

const { currentRuleSetId } = useSelectedRulesStoreRefs();
const { rules, ruleSet } = useRuleSetRulesQuery(currentRuleSetId);

const hasRules = computed(() => Boolean(ruleSet.value?.rulesCount));
const selection = ref<TaskRule[]>([]);

const showSearch = ref(false);
const order = ref('found');
const orderOptions = [
  {
    label: 'Found order',
    value: 'found',
  },
  {
    label: 'Confidence',
    value: 'confidence',
  },
  {
    label: 'Support',
    value: 'support',
  },
  {
    label: 'Custom order',
    value: 'custom',
  },
];
</script>
