import { appConfig } from '@/config/appConfig'

const { minerId } = appConfig

const basePath = '/easyminercenter/em'
export function externalUrl(path: string) {
  return `${basePath}${path}`
}

export const externalUrls = {
  ruleSetScorer: (id: number) => externalUrl(
    `/rule-sets/scorer/${id}`,
  ),
  rulesEditor: (ruleSetId: number) => externalUrl(
    `/bre?miner=${minerId}&ruleset=${ruleSetId}`,
  ),
  knowledgeExperiment: (ruleSetId: number) => externalUrl(
    `/bre-tester/new-test?miner=${minerId}&ruleset=${ruleSetId}`,
  ),
  exportRuleSet: (ruleSetId: number) => externalUrl(
    `/rule-sets/text/${ruleSetId}`,
  ),
  taskDetail: (taskId: number) => externalUrl(
    `/tasks/task-details/${taskId}`,
  ),
  exportTask: (taskId: number) => ({
    details: externalUrl(`/tasks/task-pmml/${taskId}?miner=${minerId}`),
    settings: externalUrl(`/tasks/task-setting-pmml/${taskId}?miner=${minerId}`),
    plainRules: externalUrl(`/tasks/task-rules-text/${taskId}?miner=${minerId}`),
  }),
}
