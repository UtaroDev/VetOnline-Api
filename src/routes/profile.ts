import { Router } from 'express'
import {
  getAllProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
  createProfile
} from '../controllers/profile'
import { schemaValidator } from '../middlewares/schemaValidator'
import {
  bodyProfileSchema,
  idProfileSchema,
  updateProfileSchema
} from '../schemas/profile'
import { decodedPayload } from '../middlewares/decodePayload'
const router = Router()

router
  .route('/')
  .get(decodedPayload, getAllProfiles)
  .post(schemaValidator(bodyProfileSchema), decodedPayload, createProfile)

router
  .route('/:id')
  .get(schemaValidator(idProfileSchema), decodedPayload, getProfile)
  .patch(schemaValidator(updateProfileSchema), decodedPayload, updateProfile)
  .delete(schemaValidator(idProfileSchema), decodedPayload, deleteProfile)
export { router }
