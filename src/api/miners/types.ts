export interface Miner {
  id: number;
  name: string;
  type: 'r' | 'lm';
  datasourceId: number;
  metasourceId: number;
  ruleSetId: number;
  created?: string;
  lastOpened?: string;
}
