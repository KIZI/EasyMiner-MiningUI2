<template>
  <VContainer class="pb-20">
    <div class="grid grid-cols-[auto_20rem] grid-rows-[max-content_700px] gap-2">
      <RulesMining class="min-h-[600px]" />
      <MetasourceAttributes class="max-h-[600px] min-h-full" />

      <div class="relative flex flex-col gap-x-20 gap-y-2 overflow-hidden">
        <DiscoveredRules :class="layout.activeSection === 'discoveredRules' ? 'block' : 'hidden'" />
        <TasksHistory :class="layout.activeSection === 'tasksHistory' ? 'block' : 'hidden'" />
        <SelectedRules :class="layout.activeSection === 'selectedRules' ? 'block' : 'hidden'" />
      </div>

      <SideNav />
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import DiscoveredRules from '@discoveredRules/components/DiscoveredRules.vue'
import MetasourceAttributes from '@rulesMining/components/MetasourceAttributes.vue'
import RulesMining from '@rulesMining/components/RulesMining.vue'
import SelectedRules from '@selectedRules/components/SelectedRules.vue'
import TasksHistory from '@tasksHistory/components/TasksHistory.vue'
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useRulePatternStore } from '@rulesMining/stores/rulePatternStore'
import { useInterestMeasuresStore } from '@rulesMining/stores/interestMeasuresStore'
import VContainer from '@/components/Layout/VContainer.vue'
import { useActiveMetasourceQuery } from '@/api/metasources/useActiveMetasourceQuery'
import SideNav from '@/components/Layout/SideNav.vue'
import { layout } from '@/components/Layout'
import { routesNames } from '@/libs/router'

const router = useRouter()
const activeMetasourceQuery = useActiveMetasourceQuery()

watchEffect(() => {
  const noAttributes = activeMetasourceQuery.isSuccess.value && !activeMetasourceQuery.attributes.value.length
  if (noAttributes) {
    router.push({ name: routesNames.preprocessing })
  }
})

const store = useRulePatternStore()
const imStore = useInterestMeasuresStore()
const metasourceQuery = useActiveMetasourceQuery()
// watchEffect(() => {
//   metasourceQuery.attributes.value.forEach(attribute => store.addItem(attribute, 'Antecedent'))
//   imStore.setMeasure('CONF', 0.05)
//   imStore.setMeasure('SUPP', 0.06)
// })
</script>
