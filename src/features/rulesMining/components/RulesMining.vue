<template>
  <SectionCard id="rulesMining" class="scroll-m-5 [&>*]:px-6">
    <div class="flex items-start justify-between pt-4">
      <SectionTitle>
        Association rule pattern
      </SectionTitle>
      <RulePatternTrash />
    </div>

    <div class="flex grow flex-col">
      <RulePattern />
      <InterestMeasures />

      <hr class="-mx-6 mt-5 border-gray-200">

      <div class="flex min-h-[4.5rem] items-center justify-between py-2.5">
        <RulesMiningHint :state="miningState" />

        <div class="flex items-center gap-x-8">
          <button
            v-if="isInProgress"
            class="text-sm font-medium text-red-700"
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
