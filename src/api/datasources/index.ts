import type { Datasource } from '@/api/datasources/types';
import { createRequest } from '@/libs/axios';

export default {
  detail: createRequest<number, Datasource>(
    (id) => ({ url: `/datasources/${id}` }),
  ),
};
