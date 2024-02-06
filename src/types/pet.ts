import type { z } from 'zod'

import type { bodyPetSchema, idPetSchema } from '../schemas/pet'

export type BodyPetType = z.infer<typeof bodyPetSchema>['body']

export type IdPetType = z.infer<typeof idPetSchema>['params']
