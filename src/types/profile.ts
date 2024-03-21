import type { z } from 'zod'

import type { bodyProfileSchema, idProfileSchema } from '../schemas/profile'

export type BodyProfileType = z.infer<typeof bodyProfileSchema>['body']

export type IdProfileType = z.infer<typeof idProfileSchema>['params']
