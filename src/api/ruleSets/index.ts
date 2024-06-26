import type {
  AddRulesInput,
  CreateRuleSetInput,
  RemoveRulesInput,
  RuleSet,
  RuleSetRulesInput,
  RuleSetsRulesResponse,
  UpdateRuleSetInput,
} from './types'
import type { StatusResponse } from '@/api/types'
import { createRequest } from '@/libs/axios'

export default {
  list: createRequest<void, RuleSet[]>(
    () => ({ url: '/rule-sets/' }),
  ),
  detail: createRequest<number, RuleSet>(
    id => ({ url: `/rule-sets/${id}` }),
  ),
  rules: createRequest<RuleSetRulesInput, RuleSetsRulesResponse>(
    params => ({ url: `/rule-sets/${params.id}/rules`, params }),
  ),
  create: createRequest<CreateRuleSetInput, RuleSet>(
    data => ({
      url: '/rule-sets/',
      method: 'POST',
      data,
    }),
  ),
  update: createRequest<UpdateRuleSetInput, RuleSet>(
    ({ id, ...data }) => ({
      url: `/rule-sets/${id}`,
      method: 'PUT',
      data,
    }),
  ),
  remove: createRequest<number, StatusResponse>(
    id => ({
      url: `/rule-sets/${id}`,
      method: 'DELETE',
    }),
  ),
  addRules: createRequest<AddRulesInput, StatusResponse>(
    ({ id, rules, relation }) => ({
      method: 'POST',
      url: `/rule-sets/${id}/rules`,
      params: {
        rules: rules.join(','),
        relation,
      },
    }),
  ),
  removeRules: createRequest<RemoveRulesInput, StatusResponse>(
    ({ id, rules }) => ({
      method: 'DELETE',
      url: `/rule-sets/${id}/rules`,
      params: { rules: rules.join(',') },
    }),
  ),
}
