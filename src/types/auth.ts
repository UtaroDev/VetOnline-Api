import type { z } from 'zod'
import type {
  bodyLoginSchema,
  bodyEmailSchema,
  newPasswordTokenSchema
} from '../schemas/auth'
import type { BodyUserType } from './user'
import type { JwtPayload } from 'jsonwebtoken'
export type BodyLoginType = z.infer<typeof bodyLoginSchema>['body']

export type BodyUserDataBaseType = BodyUserType & {
  role: string
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface PayloadJwtType extends JwtPayload {
  userFirstName: string
  userRole: string
  userId: string
  refresh?: string
  reset?: string
  email?: string
}

export type BodyEmailType = z.infer<typeof bodyEmailSchema>['body']

export type BodyNewPasswordTokenType = z.infer<
  typeof newPasswordTokenSchema
>['body']

export type ParamsNewPasswordTokenType = z.infer<
  typeof newPasswordTokenSchema
>['params']
