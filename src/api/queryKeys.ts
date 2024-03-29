import type { MaybeRef } from '@vueuse/core';
import type { Optional } from '@/libs/vueQuery';

export const queryKeys = {
  miner: {
    active: () => ['activeMiner'],
  },
  ruleSets: {
    list: () => ['ruleSetsList'],
    rules: (id: MaybeRef<Optional<number>>) => ['ruleSetsRules', id],
  },
  tasks: {
    rules: (id: MaybeRef<Optional<number>>) => ['taskRules', id],
    state: (id: MaybeRef<Optional<number>>) => ['taskState', id],
  },
  datasources: {
    detail: (id: MaybeRef<Optional<number>>) => ['datasourcesDetail', id],
  },
};
