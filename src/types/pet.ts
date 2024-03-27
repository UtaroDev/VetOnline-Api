import type { z } from 'zod'

import type {
  bodyPetSchema,
  idPetSchema,
  updateBodyPetSchema
} from '../schemas/pet'

export type BodyPetType = z.infer<typeof bodyPetSchema>['body']
export type BodyUpdatePetType = z.infer<typeof updateBodyPetSchema>['body']
export type IdPetType = z.infer<typeof idPetSchema>['params']
