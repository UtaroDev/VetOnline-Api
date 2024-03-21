import { Router } from 'express'
import {
  getAllProfiles,
  getProfile,
  updateProfile,
  deleteProfile
} from '../controllers/profile'
import { schemaValidator } from '../middlewares/schemaValidator'
import { idProfileSchema, updateProfileSchema } from '../schemas/profile'
import { decodedPayload } from '../middlewares/decodePayload'
const router = Router()

router.route('/').get(decodedPayload, getAllProfiles)

router
  .route('/:id')
  .get(schemaValidator(idProfileSchema), decodedPayload, getProfile)
  .put(schemaValidator(updateProfileSchema), decodedPayload, updateProfile)
  .delete(schemaValidator(idProfileSchema), decodedPayload, deleteProfile)
export { router }
