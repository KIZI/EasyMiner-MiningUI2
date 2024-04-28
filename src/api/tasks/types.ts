export type Task = {
  id: number
  miner: number
  name: string
  type: string
  state: TaskState
  importState: TaskImportState
  rulesCount: number
  rulesOrder: string
}

export type TaskWithSettings = Task & {
  settings: TaskSettings
}

export type TaskRule = {
  id: number
  text: string
  a: number
  b: number
  c: number
  d: number
  selected?: '0' | '1'
  confidence: number
  support: number
  lift: number
}

export type RuleWithRelation = TaskRule & {
  relation: TaskRuleRelation
}

export type TaskRuleRelation = 'positive' | 'neutral' | 'negative'

export type TasksRulesResponse = {
  task?: Task
  rules?: TaskRule[]
}

export type TaskState = 'new' | 'in_progress' | 'solved' | 'failed' | 'interrupted'
export type TaskImportState = 'none' | 'waiting' | 'partial' | 'done'

export type TaskSettings = {
  limitHits: number
  rule0: TaskSettingsRule
  rules: number
  debug: boolean
  strict: boolean
  taskMode: string
  taskName: string
}

export type TaskSettingsRule = {
  id: number
  groupFields: boolean
  antecedent: TaskCedent
  iMs: TaskInterestMeasure[]
  specialIMs: any[]
  succedent: TaskCedent
}

export type TaskInterestMeasure = {
  name: string
  localizedName: string
  thresholdType: string
  compareType: string
  fields: TaskField[]
  threshold: number
  alpha: number
}

export type TaskCedent = {
  type: string
  connective: TaskCedentConnective
  level: number
  children: TaskCedentChild[]
}

export type TaskCedentConnective = {
  id: number
  name: string
  type: string
}

export type TaskCedentChild = {
  name: string
  category: string
  ref: string
  fields: TaskField[]
  sign: string
}

export type TaskField = {
  name: string
  value: number
}

export type CreateTaskInput = {
  miner: number
  name: string
  antecedent: CedentInput
  consequent: CedentInput
  IMs: IMInput[]
  limitHits?: number
}
export type CedentInput = AttributeInput[]
export type AttributeInput = {
  attribute: string
  fixedValue?: string
}
export type IMInput = {
  name: string
  value: number
}
