<template>
  <div class="p-4">
    <nav class="space-y-1">
      <SideNavItem
        v-for="item in navItems"
        :key="item.label"
        :label="item.label"
        :icon="item.icon"
        :is-available="item.isAvailable"
        :is-active="item.section === activeBottomSection"
        @click="activeBottomSection = item.section"
      />
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BOTTOM_SECTIONS, activeBottomSection } from '.'
import SideNavItem from '@/components/Layout/SideNavItem.vue'
import IconPhListChecks from '~icons/ph/list-checks.vue'
import IconPhClockCounterClockwise from '~icons/ph/clock-counter-clockwise.vue'
import IconPhClipboard from '~icons/ph/clipboard.vue'
import { useActiveTaskStateQuery } from '@/api/tasks/useActiveTaskStateQuery'
import { isTaskStateRunning } from '@/api/tasks/utils'
import { useActiveTaskRulesQuery } from '@/api/tasks/useActiveTaskRulesQuery'

const activeTaskStateQuery = useActiveTaskStateQuery()
const activeTaskRulesQuery = useActiveTaskRulesQuery()

const isDiscoveredRulesAvailable = computed(() => {
  const state = activeTaskStateQuery.state.value
  if (!state || isTaskStateRunning(state)) return false
  return !activeTaskRulesQuery.isFetching.value
})

const navItems = computed(() => ([
  {
    label: 'Discovered rules',
    icon: IconPhListChecks,
    section: BOTTOM_SECTIONS.discoveredRules,
    isAvailable: isDiscoveredRulesAvailable.value,
  },
  {
    label: 'Tasks history',
    icon: IconPhClockCounterClockwise,
    section: BOTTOM_SECTIONS.tasksHistory,
  },
  {
    label: 'Selected rules',
    icon: IconPhClipboard,
    section: BOTTOM_SECTIONS.selectedRules,
  },
]))
</script>
