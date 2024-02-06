import { Router } from 'express'

import { schemaValidator } from '../middlewares/schemaValidator'
import { bodyUserSchema } from '../schemas/user'
import {
  bodyLoginSchema,
  bodyEmailSchema,
  newPasswordTokenSchema
} from '../schemas/auth'

import {
  register,
  login,
  refreshToken,
  forgotPassword,
  newPasswordByToken
} from '../controllers/auth'

const router = Router()

router.route('/register').post(schemaValidator(bodyUserSchema), register)

router.route('/login').post(schemaValidator(bodyLoginSchema), login)

router.route('/refresh/token').post(refreshToken)

router
  .route('/forgot-password')
  .post(schemaValidator(bodyEmailSchema), forgotPassword)

router
  .route('/new-password/:token')
  .post(schemaValidator(newPasswordTokenSchema), newPasswordByToken)
export { router }
