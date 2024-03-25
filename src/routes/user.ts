import { Router } from 'express'

import { schemaValidator } from '../middlewares/schemaValidator'

import {
  getAllUsers,
  getUser,
  deleteUser,
  register,
  updateUser
} from '../controllers/user'
import { decodedPayload } from '../middlewares/decodePayload'
import { bodyUserSchema, idUserSchema, updateUserSchema } from '../schemas/user'

const router = Router()

router.route('/').get(decodedPayload, getAllUsers)

router.route('/register').post(schemaValidator(bodyUserSchema), register)

router
  .route('/:id')
  .get(schemaValidator(idUserSchema), decodedPayload, getUser)
  .delete(schemaValidator(idUserSchema), decodedPayload, deleteUser)
  .patch(schemaValidator(updateUserSchema), decodedPayload, updateUser)
export { router }
