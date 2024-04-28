<template>
  <VContainer class="pb-20">
    <div class="grid grid-cols-[auto_20rem] grid-rows-[600px_auto] gap-2">
      <RulesMining />
      <MetasourceAttributes />

      <div class="flex flex-col items-stretch gap-y-2">
        <DiscoveredRules v-if="shouldShowDiscoveredRules" />
        <TasksHistory v-else />

        <SelectedRules />
      </div>
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import DiscoveredRules from '@discoveredRules/components/DiscoveredRules.vue'
import MetasourceAttributes from '@rulesMining/components/MetasourceAttributes.vue'
import RulesMining from '@rulesMining/components/RulesMining.vue'
import SelectedRules from '@selectedRules/components/SelectedRules.vue'
import TasksHistory from '@tasksHistory/components/TasksHistory.vue'
import { computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useActiveTaskRulesQuery } from '@/api/tasks/useActiveTaskRulesQuery'
import { useActiveTaskStateQuery } from '@/api/tasks/useActiveTaskStateQuery'
import VContainer from '@/components/Layout/VContainer.vue'
import { useActiveMetasourceQuery } from '@/api/metasources/useActiveMetasourceQuery'
import { useTasksStore } from '@/stores/tasksStore'
import { isTaskStateRunning } from '@/api/tasks/utils'

const router = useRouter()
const activeTaskStateQuery = useActiveTaskStateQuery()
const activeTaskRulesQuery = useActiveTaskRulesQuery()
const { isSuccess, attributes } = useActiveMetasourceQuery()

const shouldShowDiscoveredRules = computed(() => {
  const state = activeTaskStateQuery.state.value
  if (!state || isTaskStateRunning(state)) return false
  return !activeTaskRulesQuery.isFetching.value
})

watchEffect(() => {
  if (isSuccess.value && !attributes.value.length) {
    router.push({ name: 'Preprocessing' })
  }
})
</script>
