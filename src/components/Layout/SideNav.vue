<template>
  <div class="p-4">
    <nav class="space-y-1">
      <SideNavItem
        v-for="item in navItems"
        :key="item.label"
        :label="item.label"
        :icon="item.icon"
        :is-available="item.isAvailable"
        :is-active="layout.isSectionActive(item.section)"
        @click="layout.setActiveSection(item.section)"
      />
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SECONDARY_SECTIONS, layout } from '.'
import SideNavItem from '@/components/Layout/SideNavItem.vue'
import IconPhListChecks from '~icons/ph/list-checks.vue'
import IconPhClockCounterClockwise from '~icons/ph/clock-counter-clockwise.vue'
import IconPhClipboard from '~icons/ph/clipboard.vue'
import { useTasksStore } from '@/stores/tasksStore'

const tasksStore = useTasksStore()

const navItems = computed(() => ([
  {
    label: 'Discovered rules',
    icon: IconPhListChecks,
    section: SECONDARY_SECTIONS.discoveredRules,
    isAvailable: !!tasksStore.activeTaskId,
  },
  {
    label: 'Tasks history',
    icon: IconPhClockCounterClockwise,
    section: SECONDARY_SECTIONS.tasksHistory,
  },
  {
    label: 'Selected rules',
    icon: IconPhClipboard,
    section: SECONDARY_SECTIONS.selectedRules,
  },
]))
</script>
