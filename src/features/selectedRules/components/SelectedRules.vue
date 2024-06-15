<template>
  <SectionCard class="relative min-h-[350px] py-4 group-px-6">
    <div class="min-h-16 peer-px">
      <div class="flex min-h-8 items-center justify-between">
        <SectionTitle>Selected rules</SectionTitle>

        <div class="-mr-2 flex items-center gap-x-1">
          <VButton
            variant="ghost"
            size="xs"
            class="shrink-0 gap-x-1.5"
            @click="ruleSetScorerModal.open"
          >
            <icon-ph-lightning class="size-5" />
            Test model
          </VButton>
          <button class="inline-flex items-center gap-x-2 px-2 text-xs hover:underline" @click="openRulesEditor">
            <icon-ph-note-pencil-light class="size-5" />
            Rules editor
          </button>
          <button class="inline-flex items-center gap-x-2 px-2 text-xs hover:underline" @click="openKnowledgeExperiment">
            <icon-ph-lightbulb class="size-5" />
            Knowledge experiment
          </button>
        </div>
      </div>

      <div v-if="ruleSet" class="flex items-center">
        <div class="mr-4 break-all text-lg font-medium text-primary-900">
          <Truncate
            :length="appConfig.truncateLength.ruleSet"
            :text="ruleSet.name"
          />
        </div>
        <Popover>
          <PopoverButton
            :as="VButton"
            variant="ghost"
            class="p-1.5"
          >
            <icon-ph-note-pencil-light class="size-5" />
          </PopoverButton>
          <EditRuleSetPopoverForm :rule-set="ruleSet" />
        </Popover>
        <Popover>
          <PopoverButton
            :as="VButton"
            variant="ghost"
            class="gap-x-2 p-1.5 text-sm"
          >
            <icon-ph-plus-square-light class="size-5" />
          </PopoverButton>
          <EditRuleSetPopoverForm />
        </Popover>
        <ChangeRuleSetListbox />
      </div>
    </div>

    <RulesGrid
      v-model:filters="filters"
      :rules="rules"
      :is-loading="isPending || isLoading"
      :is-refetching="isRefetching"
      animate
    >
      <template #empty>
        <div class="flex gap-x-3">
          <icon-ph-info class="size-6" />
          Add interesting discovered rules
        </div>
      </template>

      <template #ruleActions="{ rule }">
        <VIconButton
          title="Remove from selected rules"
          class="text-red-700 hover:bg-subtle-white"
          :loading="isRuleMutationLoading(rule)"
          @click="handleRemove(rule)"
        >
          <icon-ph-x-circle class="size-5" />
        </VIconButton>
      </template>

      <template #actions>
        <div class="flex items-center gap-x-5">
          <button class="inline-flex items-center gap-x-2 text-xs hover:underline" @click="exportRuleSet">
            <icon-ph-export class="size-4 text-gray-700" />
            Export ruleset
          </button>
        </div>
      </template>
    </RulesGrid>

    <RuleSetScorerModal />
  </SectionCard>
</template>

<script setup lang="ts">
import { useSelectedRulesStoreRefs } from '@selectedRules/stores/selectedRulesStore'
import EditRuleSetPopoverForm from '@selectedRules/components/EditRuleSetPopoverForm.vue'
import ChangeRuleSetListbox from '@selectedRules/components/ChangeRuleSetListbox.vue'
import { useRuleSetScorerModal } from '@selectedRules/components/useRuleSetScorerModal'
import RuleSetScorerModal from '@selectedRules/components/RuleSetScorerModal.vue'
import { useSelectedRules } from '@selectedRules/composables/useSelectedRules'
import { useRuleSetRulesQuery } from '@/api/ruleSets/useRuleSetRulesQuery'

import SectionCard from '@/components/Layout/SectionCard.vue'
import SectionTitle from '@/components/Layout/SectionTitle.vue'
import { Popover, PopoverButton } from '@/components/Popover'
import VButton from '@/components/VButton.vue'
import Truncate from '@/components/Truncate.vue'
import { appConfig } from '@/config/appConfig'
import { externalUrls } from '@/utils/externalUrls'
import RulesGrid from '@/components/Rules/RulesGrid.vue'
import VIconButton from '@/components/VIconButton.vue'
import { createTaskRulesFilters } from '@/components/Task/taskRulesFilters'

const { currentRuleSetId } = useSelectedRulesStoreRefs()
const ruleSetScorerModal = useRuleSetScorerModal()
const ruleSetsRulesQuery = useRuleSetRulesQuery(currentRuleSetId)
const { rules, ruleSet, isPending, isLoading, isRefetching } = ruleSetsRulesQuery

const filters = createTaskRulesFilters()

const {
  handleRemove,
  isRuleMutationLoading,
} = useSelectedRules()

function openRulesEditor() {
  if (!currentRuleSetId.value) return
  if (confirm('Rule editor will be opened in new window. After finishing the work in editor, don´t forget to reload this miner window.')) {
    window.open(externalUrls.rulesEditor(currentRuleSetId.value), '_blank')
  }
}

function openKnowledgeExperiment() {
  if (!currentRuleSetId.value) return
  if (confirm('Are you sure you want to use this rule set as the basis of a knowledge experiment?')) {
    window.open(externalUrls.knowledgeExperiment(currentRuleSetId.value), '_blank')
  }
}

function exportRuleSet() {
  if (!currentRuleSetId.value) return
  window.open(externalUrls.exportRuleSet(currentRuleSetId.value), '_blank')
}
</script>
