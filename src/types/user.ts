import type { z } from 'zod'
import type {
  bodyUserSchema,
  idUserSchema,
  updateBodyUserSchema
} from '../schemas/user'

export type BodyUserSchema = z.infer<typeof bodyUserSchema>['body']

export type IdUserType = z.infer<typeof idUserSchema>['params']

export type BodyUpdateUser = z.infer<typeof updateBodyUserSchema>['body']
