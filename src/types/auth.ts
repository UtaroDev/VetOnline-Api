import type { z } from 'zod'
import type { bodyEmailSchema, newPasswordTokenSchema } from '../schemas/user'
import type { BodyUserSchema } from './user'
import type { JwtPayload } from 'jsonwebtoken'

export type BodyEmailType = z.infer<typeof bodyEmailSchema>['body']

export type BodyUserDataBaseType = BodyUserSchema & {
  id: string
  role: string
  resetToken?: string | null
  resetTokenStatus?: boolean | null
  createdAt: Date
  updatedAt: Date
}

export type BodyNewPasswordTokenType = z.infer<
  typeof newPasswordTokenSchema
>['body']

export type ParamsNewPasswordTokenType = z.infer<
  typeof newPasswordTokenSchema
>['params']

// Se queda
export interface PayloadJwtType extends JwtPayload {
  userRole: string
  userId: string
  refresh?: string
  reset?: string
  email?: string
}
