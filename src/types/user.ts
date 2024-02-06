import type { z } from 'zod'

import type {
  bodyUserSchema,
  idUserSchema
} from '../schemas/user'

export type BodyUserType = z.infer<typeof bodyUserSchema>['body']

export type IdUserType = z.infer<typeof idUserSchema>['params']
