import type { ValueOf } from 'type-fest'
import { computed, ref, watch } from 'vue'
import { useActiveTaskRulesQuery } from '@/api/tasks/useActiveTaskRulesQuery'
import { useActiveTaskStateQuery } from '@/api/tasks/useActiveTaskStateQuery'
import { useTasksStore } from '@/stores/tasksStore'
import { isTaskStateRunning } from '@/api/tasks/utils'
import { useActiveTaskDetailQuery } from '@/api/tasks/useActiveTaskDetailQuery'

export const BOTTOM_SECTIONS = {
  discoveredRules: 'discoveredRules',
  tasksHistory: 'tasksHistory',
  selectedRules: 'selectedRules',
} as const

export type BottomSection = ValueOf<typeof BOTTOM_SECTIONS>

export const activeBottomSection = ref<BottomSection>(BOTTOM_SECTIONS.selectedRules)

export function useInitLayout() {
  const tasksStore = useTasksStore()
  const activeTaskStateQuery = useActiveTaskStateQuery()
  const activeTaskRulesQuery = useActiveTaskRulesQuery()
  const activeTaskDetailQuery = useActiveTaskDetailQuery()

  const hasActiveTaskChanged = ref(false)

  const isDiscoveredRulesViewAvailable = computed(() => {
    const state = activeTaskStateQuery.state.value
    if (!state || isTaskStateRunning(state)) return false
    if (activeTaskRulesQuery.isFetching.value) return false
    if (activeTaskDetailQuery.isFetching.value) return false
    return activeTaskDetailQuery.data.value?.id === tasksStore.activeTaskId
  })

  tasksStore.$onAction(({ name }) => {
    if (name === 'setActiveTaskId') {
      hasActiveTaskChanged.value = true
    }
  })

  watch([hasActiveTaskChanged, isDiscoveredRulesViewAvailable], () => {
    if (isDiscoveredRulesViewAvailable.value && hasActiveTaskChanged.value) {
      activeBottomSection.value = BOTTOM_SECTIONS.discoveredRules
      hasActiveTaskChanged.value = false
    }
  })
}
