import type { TaskRule, TaskRuleRelation } from '@/api/tasks/types'

export type RuleSet = {
  id: number
  name: string
  description: string
  rulesCount: number
  lastModified: string
}

export type RuleSetsRulesResponse = {
  ruleset: RuleSet
  rules: TaskRule[]
  rulesCount: number
}

export type AddRulesInput = {
  id: number
  rules: number[]
  relation?: TaskRuleRelation
}

export type RemoveRulesInput = Omit<AddRulesInput, 'relation'>

export type CreateRuleSetInput = {
  name: string
  description?: string
}
export type UpdateRuleSetInput = {
  id: number
} & CreateRuleSetInput

export type RuleSetRulesInput = {
  id: number
  orderby?: 'conf' | 'supp' | 'lift' | 'default' | 'cba'
  order?: 'ASC' | 'DESC'

  offset?: number
  limit?: number

  search?: string
  searchAntecedent?: string
  searchConsequent?: string
}
