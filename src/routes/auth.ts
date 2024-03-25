import { Router } from 'express'

import { schemaValidator } from '../middlewares/schemaValidator'
import {
  bodyUserSchema,
  bodyEmailSchema,
  newPasswordTokenSchema
} from '../schemas/user'

import {
  login,
  refreshToken,
  forgotPassword,
  newPasswordByToken
} from '../controllers/auth'

const router = Router()

router.route('/login').post(schemaValidator(bodyUserSchema), login)

router.route('/refresh/token').post(refreshToken)

router
  .route('/forgot-password')
  .post(schemaValidator(bodyEmailSchema), forgotPassword)

router
  .route('/new-password/:token')
  .post(schemaValidator(newPasswordTokenSchema), newPasswordByToken)
export { router }
