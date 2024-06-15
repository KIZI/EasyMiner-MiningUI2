import type { ValueOf } from 'type-fest'
import { reactive, ref } from 'vue'

export const SECONDARY_SECTIONS = {
  discoveredRules: 'discoveredRules',
  tasksHistory: 'tasksHistory',
  selectedRules: 'selectedRules',
} as const

export type SecondarySection = ValueOf<typeof SECONDARY_SECTIONS>

const activeSection = ref<SecondarySection>(SECONDARY_SECTIONS.tasksHistory)

const setActiveSection = (section: SecondarySection) => activeSection.value = section
const showTasksHistory = () => setActiveSection(SECONDARY_SECTIONS.tasksHistory)
const showDiscoveredRules = () => setActiveSection(SECONDARY_SECTIONS.discoveredRules)
const isSectionActive = (section: SecondarySection) => activeSection.value === section
function closeDiscoveredRules() {
  if (isSectionActive(SECONDARY_SECTIONS.discoveredRules)) {
    showTasksHistory()
  }
}

export const layout = reactive({
  activeSection,
  setActiveSection,
  showTasksHistory,
  showDiscoveredRules,
  closeDiscoveredRules,
  isSectionActive,
})
