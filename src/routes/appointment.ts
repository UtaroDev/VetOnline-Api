import { Router } from 'express'

import { schemaValidator } from '../middlewares/schemaValidator'
import {
  bodyAppointmentSchema,
  idAppointmentSchema,
  updateAppointmentSchema
} from '../schemas/appointment'

import {
  getAllAppointments,
  getAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment
} from '../controllers/appointment'

import { decodedPayload } from '../middlewares/decodePayload'
const router = Router()

router.route('/').get(decodedPayload, getAllAppointments).post(
  schemaValidator(bodyAppointmentSchema),
  decodedPayload,

  createAppointment
)

router
  .route('/:id')
  .get(schemaValidator(idAppointmentSchema), decodedPayload, getAppointment)
  .put(
    schemaValidator(updateAppointmentSchema),
    decodedPayload,

    updateAppointment
  )
  .delete(
    schemaValidator(idAppointmentSchema),
    decodedPayload,
    deleteAppointment
  )

export { router }
