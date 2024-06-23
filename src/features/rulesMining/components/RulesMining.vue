<template>
  <SectionCard id="rulesMining" class="scroll-m-5 group-px-6">
    <div class="flex items-start justify-between pt-4 peer-px">
      <SectionTitle>
        Association rule pattern
      </SectionTitle>
      <RulePatternTrash />
    </div>

    <div class="flex min-h-0 grow flex-col">
      <RulePattern class="min-h-0 peer-px" />
      <InterestMeasures class="pb-6 pt-4 peer-px" />

      <div class="mt-2 flex h-16 shrink-0 items-center justify-between border-t border-gray-200 py-2.5 peer-px">
        <RulesMiningHint :state="miningState" />

        <div class="flex items-center gap-x-8">
          <button
            v-if="isInProgress"
            class="text-sm font-medium text-red-700 underline hover:no-underline"
            @click="abortMining"
          >
            Stop mining
          </button>

          <VButton
            v-if="isButtonVisible"
            size="xl"
            class="w-36"
            :disabled="isButtonDisabled"
            variant="primary"
            @click="startMining"
          >
            Mine rules
          </VButton>
        </div>
      </div>
    </div>
  </SectionCard>
</template>

<script lang="ts" setup>
import InterestMeasures from '@rulesMining/components/InterestMeasures/InterestMeasures.vue'
import RulePattern from '@rulesMining/components/RulePattern/RulePattern.vue'
import RulePatternTrash from '@rulesMining/components/RulePattern/RulePatternTrash.vue'
import RulesMiningHint from '@rulesMining/components/RulesMiningHint.vue'
import { useRulesMining } from '@rulesMining/composables/useRulesMining'
import { computed } from 'vue'
import SectionCard from '@/components/Layout/SectionCard.vue'
import SectionTitle from '@/components/Layout/SectionTitle.vue'
import VButton from '@/components/VButton.vue'

const { isInProgress, miningState, startMining, abortMining } = useRulesMining()

const isButtonVisible = computed(() => miningState.value !== 'disabled')
const isButtonDisabled = computed(() => isInProgress.value || miningState.value === 'blocked_by_interest_measures')
</script>
