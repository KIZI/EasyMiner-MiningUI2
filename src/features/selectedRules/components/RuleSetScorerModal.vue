<template>
  <VModal
    :open="ruleSetScorerModal.isOpen"
    class="max-w-5xl px-5 pb-4 pt-3"
    @close="ruleSetScorerModal.close"
  >
    <template #title>
      <h2 class="text-lg font-medium">
        {{ ruleSet?.name }}
      </h2>
    </template>

    <IframeWrapper class="mt-5">
      <iframe
        class="h-dvh max-h-[500px] w-full"
        :src="iframeSource"
        frameborder="0"
      />
    </IframeWrapper>
  </VModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSelectedRulesStore } from '@selectedRules/stores/selectedRulesStore'
import { useRuleSetScorerModal } from '@selectedRules/components/useRuleSetScorerModal'
import VModal from '@/components/VModal.vue'
import IframeWrapper from '@/components/IframeWrapper.vue'
import { useRuleSetRulesQuery } from '@/api/ruleSets/useRuleSetRulesQuery'
import { externalUrl, externalUrls } from '@/utils/externalUrls'
import { appConfig } from '@/config/appConfig'

const selectedRulesStore = useSelectedRulesStore()
const { ruleSet } = useRuleSetRulesQuery(selectedRulesStore.currentRuleSetId)
const ruleSetScorerModal = useRuleSetScorerModal()

const iframeSource = computed(() => {
  if (!selectedRulesStore.currentRuleSetId) return ''
  return externalUrls.ruleSetScorer(selectedRulesStore.currentRuleSetId)
})
</script>
