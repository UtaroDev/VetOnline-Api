import type { z } from 'zod'
import type {
  bodyAuthSchema,
  bodyEmailSchema,
  newPasswordTokenSchema
} from '../schemas/auth'

import type { JwtPayload } from 'jsonwebtoken'
export type BodyAuthType = z.infer<typeof bodyAuthSchema>['body']

export type BodyEmailType = z.infer<typeof bodyEmailSchema>['body']

export type BodyNewPasswordTokenType = z.infer<
  typeof newPasswordTokenSchema
>['body']

export type ParamsNewPasswordTokenType = z.infer<
  typeof newPasswordTokenSchema
>['params']

export type BodyUserDataBaseType = BodyAuthType & {
  id: string
  role: string
  resetToken?: string | null
  resetTokenStatus?: boolean | null
  createdAt: Date
  updatedAt: Date
}
export interface PayloadJwtType extends JwtPayload {
  userRole: string
  userId: string
  refresh?: string
  reset?: string
  email?: string
}
