import type { TaskSimpleResponse } from '@/api/model'

export type MiningState = TaskSimpleResponse['state'] | (
  'aborted' |
  'available' |
  'blocked_by_interest_measures' |
  'disabled' |
  'no_rules_found'
)
