import { Router } from 'express'
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/user'
import { schemaValidator } from '../middlewares/schemaValidator'
import { idUserSchema, updateUserSchema } from '../schemas/user'
import { decodedPayload } from '../middlewares/decodePayload'
const router = Router()

router.route('/').get(decodedPayload, getAllUsers)

router
  .route('/:id')
  .get(schemaValidator(idUserSchema), decodedPayload, getUser)
  .put(schemaValidator(updateUserSchema), decodedPayload, updateUser)
  .delete(schemaValidator(idUserSchema), decodedPayload, deleteUser)
export { router }
