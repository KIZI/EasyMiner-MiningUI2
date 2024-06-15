import type { TaskState } from '@/api/tasks/types'

export function isTaskStateRunning(state?: TaskState) {
  if (!state) return false
  return state === 'new' || state === 'in_progress'
}
