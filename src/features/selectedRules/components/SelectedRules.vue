<template>
  <SectionCard class="relative min-h-[350px] py-4 group-px-6">
    <div class="shrink-0 peer-px">
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

      <div v-if="!isViewLoading && ruleSet" class="flex items-center">
        <div class="mr-4 break-all text-lg font-medium text-primary-900">
          <Truncate
            :length="appConfig.truncateLength.ruleSet"
            :text="ruleSet.name"
          />
        </div>
        <PopoverRoot>
          <PopoverTrigger
            :as="VButton"
            variant="ghost"
            class="p-1.5"
          >
            <icon-ph-note-pencil-light class="size-5" />
          </PopoverTrigger>
          <EditRuleSetPopoverForm :rule-set="ruleSet" />
        </PopoverRoot>
        <PopoverRoot>
          <PopoverTrigger
            :as="VButton"
            variant="ghost"
            class="gap-x-2 p-1.5 text-sm"
          >
            <icon-ph-plus-square-light class="size-5" />
          </PopoverTrigger>
          <EditRuleSetPopoverForm />
        </PopoverRoot>
        <ChangeRuleSetListbox />
      </div>
    </div>

    <div v-if="!isViewLoading" class="-mt-0.5 text-sm peer-px">
      contains {{ rulesCount }} {{ $t('common.rules', rulesCount ?? 0) }}
    </div>

    <RulesGrid>
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
          :loading="selectedRules.isRuleSelectionLoading(rule)"
          :disabled="selectedRules.isRuleBeingRemoved(rule)"
          @click="removeRules([rule])"
        >
          <icon-ph-x-circle class="size-5" />
        </VIconButton>
      </template>

      <template #actions>
        <div class="flex items-center gap-x-5">
          <a
            v-if="activeRuleSetId" target="_blank" :href="externalUrls.exportRuleSet(activeRuleSetId)" class="inline-flex items-center gap-x-2 text-xs hover:underline"
          >
            <icon-ph-export class="size-4 text-gray-700" />
            Export ruleset
          </a>
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
import { type TransitionGroupProps, computed, ref, watch } from 'vue'
import { keepPreviousData } from '@tanstack/vue-query'
import { PopoverTrigger } from 'radix-vue'
import { useActiveRuleSetRulesQuery, useInvalidateActiveRuleSetRules, useRuleSetRulesQuery } from '@/api/ruleSets/useRuleSetRulesQuery'

import SectionCard from '@/components/Layout/SectionCard.vue'
import SectionTitle from '@/components/Layout/SectionTitle.vue'
import { Popover, PopoverButton } from '@/components/Popover'
import VButton from '@/components/VButton.vue'
import Truncate from '@/components/Truncate.vue'
import { appConfig } from '@/config/appConfig'
import { externalUrls } from '@/utils/externalUrls'
import RulesGrid from '@/components/Rules/RulesGrid.vue'
import VIconButton from '@/components/VIconButton.vue'
import { useRulesGrid } from '@/components/Rules/rulesGrid'
import type { TaskRule } from '@/api/tasks/types'
import { useActiveRuleSetDetailQuery } from '@/api/ruleSets/useRuleSetDetailQuery'
import { queryClient } from '@/libs/vueQuery'
import { queryKeys } from '@/api/queryKeys'
import PopoverRoot from '@/components/RadixPopover/PopoverRoot.vue'

const rulesGrid = useRulesGrid()
const selectedRules = useSelectedRules()
const ruleSetScorerModal = useRuleSetScorerModal()

const activeRuleSetDetailQuery = useActiveRuleSetDetailQuery({
  queryOptions: { placeholderData: keepPreviousData },
})
const { ruleSet } = activeRuleSetDetailQuery
const activeRuleSetRulesQuery = useActiveRuleSetRulesQuery({
  options: rulesGrid.requestParams,
  queryOptions: { placeholderData: keepPreviousData },
})
const { activeRuleSetId, rulesCount } = activeRuleSetRulesQuery

const isViewLoading = computed(() => {
  return activeRuleSetDetailQuery.isPending.value || activeRuleSetRulesQuery.isPending.value
})

const isRemoveLoading = ref(false)
const isRefetching = computed(() => {
  return !isRemoveLoading.value && activeRuleSetRulesQuery.isRefetching.value
})

rulesGrid.setDataState({
  rules: activeRuleSetRulesQuery.rules,
  totalCount: activeRuleSetRulesQuery.rulesCount,
  isLoading: isViewLoading,
  isRefetching,
})

const isEveryRuleOnCurrentPageRemoved = ref(false)

rulesGrid.setUiState({
  getItemProps(rule) {
    if (selectedRules.isRuleBeingRemoved(rule)) {
      return {
        'data-removed': 'true',
      }
    }
  },
  transitionGroup: {
    onEnter(el) {
      if (!(el instanceof HTMLElement)) return
      if (isEveryRuleOnCurrentPageRemoved.value) {
        el.style.display = 'none'
        setTimeout(() => {
          el.style.display = ''
          el.animate([
            { opacity: 0 },
            { opacity: 1 },
          ], {
            duration: 500,
          })
        }, 500)
      }
    },
    async onLeave(el, done) {
      const isRemoved = el.getAttribute('data-removed')
      if (!isRemoved) return done()

      el.animate([
        { backgroundColor: '#fca5a5' },
      ], {
        duration: 400,
        fill: 'forwards',
      })

      el.animate([
        { opacity: 0, overflow: 'hidden' },
      ], {
        duration: 300,
        delay: 300,
        fill: 'forwards',
      })

      el.animate([
        {
          height: `${el.clientHeight}px`,
        },
        { height: '0px', paddingTop: '0px', paddingBottom: '0px' },
      ], {
        duration: 300,
        delay: 500,
        fill: 'forwards',
      }).finished.then(done)
    },
  },
})
rulesGrid.setEventHandlers({
  removeSelected: async () => {
    await removeRules(rulesGrid.selection.value)
  },
})

async function removeRules(rules: TaskRule[]) {
  isRemoveLoading.value = true
  if (rules.length === activeRuleSetRulesQuery.rules.value.length) {
    isEveryRuleOnCurrentPageRemoved.value = true
  }
  try {
    await selectedRules.removeRules(rules)
    // If all rules were removed from the current page, go to the previous page
    if (isEveryRuleOnCurrentPageRemoved.value) {
      rulesGrid.pagination.previous()
    }
    queryClient.invalidateQueries({ queryKey: queryKeys.ruleSets.rules(activeRuleSetId), refetchType: 'none' })
    await activeRuleSetRulesQuery.refetch()
  }
  finally {
    isRemoveLoading.value = false
    isEveryRuleOnCurrentPageRemoved.value = false
    selectedRules.removeRulesMutation.reset()
  }
}

function openRulesEditor() {
  if (!activeRuleSetId.value) return
  if (confirm('Rule editor will be opened in new window. After finishing the work in editor, don´t forget to reload this miner window.')) {
    window.open(externalUrls.rulesEditor(activeRuleSetId.value), '_blank')
  }
}

function openKnowledgeExperiment() {
  if (!activeRuleSetId.value) return
  if (confirm('Are you sure you want to use this rule set as the basis of a knowledge experiment?')) {
    window.open(externalUrls.knowledgeExperiment(activeRuleSetId.value), '_blank')
  }
}

function exportRuleSet() {
  if (!activeRuleSetId.value) return
  window.open(externalUrls.exportRuleSet(activeRuleSetId.value), '_blank')
}
</script>
