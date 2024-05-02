import type { User } from '@/api/auth/types'
import { createRequest } from '@/libs/axios'

export default {
  user: createRequest<void, User>(
    () => ({ url: `/auth` }),
  ),
}
