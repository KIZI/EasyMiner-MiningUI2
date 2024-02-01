import type { Miner } from './types';
import { createRequest } from '@/libs/axios';

export default {
  detail: createRequest<number, Miner>(
    (id) => ({ url: `/miners/${id}` }),
  ),
};
