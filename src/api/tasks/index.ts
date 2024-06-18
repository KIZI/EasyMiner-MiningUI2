import type { CreateTaskInput, Task, TaskRulesInput, TaskWithSettings, TasksRulesResponse } from './types'
import { createRequest } from '@/libs/axios'

export default {
  detail: createRequest<number, TaskWithSettings>(
    id => ({ url: `/tasks/${id}` }),
  ),
  state: createRequest<number, Task>(
    id => ({ url: `/tasks/${id}/state` }),
  ),
  rules: createRequest<TaskRulesInput, TasksRulesResponse>(
    params => ({ url: `/tasks/${params.id}/rules`, params }),
  ),
  create: createRequest<CreateTaskInput, TaskWithSettings>(
    task => ({
      url: '/tasks/simple',
      method: 'POST',
      data: task,
    }),
  ),
  start: createRequest<number, Task>(
    id => ({ url: `/tasks/${id}/start` }),
  ),
  stop: createRequest<number, Task>(
    id => ({ url: `/tasks/${id}/stop` }),
  ),
  delete: createRequest<number, Task>(
    id => ({
      url: `/tasks/${id}`,
      method: 'DELETE',
    }),
  ),
}
