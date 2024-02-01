import type { Metasource } from './types';
import { createRequest } from '@/libs/axios';

export default {
  detail: createRequest<number, Metasource>(
    (id) => ({ url: `/metasources/${id}` }),
  ),
};
