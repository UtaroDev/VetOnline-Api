import type { z } from 'zod'

import type {
  bodyProfileSchema,
  idProfileSchema,
  updateBodyUserSchema
} from '../schemas/profile'

export type BodyUpdateProfileType = z.infer<typeof updateBodyUserSchema>['body']
export type BodyProfileType = z.infer<typeof bodyProfileSchema>['body']
export type IdProfileType = z.infer<typeof idProfileSchema>['params']
