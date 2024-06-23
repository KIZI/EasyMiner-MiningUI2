<template>
  <VModal
    :open="ruleSetScorerModal.isOpen"
    class="max-w-5xl px-5 pb-4 pt-3"
    @close="ruleSetScorerModal.close"
  >
    <template #title>
      <h2 class="text-lg font-medium">
        {{ activeRuleSet?.name }}
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
import { computed } from 'vue'
import { useRuleSetScorerModal } from '@selectedRules/components/useRuleSetScorerModal'
import { useSelectedRulesStore } from '@selectedRules/stores/selectedRulesStore'
import { storeToRefs } from 'pinia'
import VModal from '@/components/VModal.vue'
import IframeWrapper from '@/components/IframeWrapper.vue'
import { externalUrls } from '@/utils/externalUrls'

const { activeRuleSet } = storeToRefs(useSelectedRulesStore())
const ruleSetScorerModal = useRuleSetScorerModal()

const iframeSource = computed(() => {
  if (!activeRuleSet.value?.id) return ''
  return externalUrls.ruleSetScorer(activeRuleSet.value.id)
})
</script>
