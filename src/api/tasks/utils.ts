import type { TaskState } from '@/api/tasks/types'

export function isTaskStateRunning(state: TaskState) {
  return state === 'new' || state === 'in_progress'
}
