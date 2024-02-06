import type { z } from 'zod'

import type {
  bodyAppointmentSchema,
  idAppointmentSchema
} from '../schemas/appointment'

export type BodyAppointmentType = z.infer<typeof bodyAppointmentSchema>['body']

export type IdAppointmentType = z.infer<typeof idAppointmentSchema>['params']
