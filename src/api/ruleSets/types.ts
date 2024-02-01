import type { TaskRule, TaskRuleRelation } from '@/api/tasks/types';

export interface RuleSet {
  id: number;
  name: string;
  description: string;
  rulesCount: number;
  lastModified: string;
}

export interface RuleSetsRulesResponse {
  ruleset: RuleSet;
  rule: TaskRule[];
}

export interface AddRulesInput {
  id: number;
  rules: number[];
  relation?: TaskRuleRelation;
}

export type RemoveRulesInput = Omit<AddRulesInput, 'relation'>;

export interface CreateRuleSetInput {
  name: string;
  description?: string;
}
export interface UpdateRuleSetInput extends CreateRuleSetInput {
  id: number;
}
