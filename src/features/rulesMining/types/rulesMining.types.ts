import type { TaskState } from '@/api/tasks/types'

export type MiningState = TaskState | (
  'aborted' |
  'available' |
  'blocked_by_interest_measures' |
  'disabled' |
  'no_rules_found'
)
