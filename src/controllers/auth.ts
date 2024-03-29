import type { Response, Request, NextFunction } from 'express'

import type {
  BodyEmailType,
  BodyNewPasswordTokenType,
  ParamsNewPasswordTokenType
} from '../types/auth'
import type { BodyUserSchema } from '../types/user'
import { httpResponse } from '../helpers/httpStatus'
import { authService } from '../services/auth'
import {
  generateToken,
  verifyToken,
  generateResetToken,
  verifyResetToken
} from '../helpers/token'
import { sendEmail } from '../helpers/mailControl'
import bcrypt from 'bcrypt'
export const login = async (
  req: Request<unknown, unknown, BodyUserSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req
    const data = body
    const { email, password } = data

    const user = await authService.findEmail(email.toLocaleLowerCase().trim())
    if (user === null) {
      return httpResponse.FORBIDDEN(res, 'Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return httpResponse.FORBIDDEN(res, 'Invalid credentials')
    }

    const { token, refreshToken } = generateToken(user)
    const responseData = {
      token,
      refreshToken
    }
    return httpResponse.OK(res, responseData)
  } catch (error) {
    next(error)
  } finally {
    console.log('Login finalized')
  }
}

// Controlador para que cuando reciba un rt devuelva otros dos tokens nuevitos

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req
    const data = body
    const { refreshToken } = data
    const dataRes = verifyToken(refreshToken)
    return httpResponse.OK(res, dataRes)
  } catch (error) {
    next(error)
  } finally {
    console.log('REFRESH TOKEN finalized')
  }
}

// Funcion para poder reestablecer una contraseña pide un mail y devuelve un token en el backend
export const forgotPassword = async (
  req: Request<unknown, unknown, BodyEmailType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const message =
      'Si el correo es correcto, verifica la casilla de tu email, donde tendras los pasos a seguir para reestablecer tu contraseña'
    const { email } = req.body
    const user = await authService.findEmail(email)

    if (user === null) {
      return httpResponse.OK(res, message)
    }
    const { resetToken } = generateResetToken(email)
    await authService.updateResetToken(email, resetToken)
    let verificationLink = process.env.API_URL_BASE as string
    verificationLink += resetToken
    await sendEmail(email, verificationLink)
    return httpResponse.OK(res, message)
  } catch (error) {
    next(error)
  } finally {
    console.log('Forgot password finalized')
  }
}

// Funcion que pide un token y una nueva contraseña para poder dambiarla
export const newPasswordByToken = async (
  req: Request<ParamsNewPasswordTokenType, unknown, BodyNewPasswordTokenType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newPassword = req.body.password
    const tokenForResetPassword = req.params.token
    const { decoded } = verifyResetToken(tokenForResetPassword)
    const email = decoded?.email as string
    const user = await authService.findEmail(email)
    if (user === null) {
      return httpResponse.BAD_REQUEST(
        res,
        'Ocurrio un error inesperado',
        'error'
      )
    }
    if (tokenForResetPassword !== user.resetToken) {
      return httpResponse.BAD_REQUEST(
        res,
        'Ocurrio un error inesperado',
        'error'
      )
    }
    if (user.resetTokenStatus === true) {
      return httpResponse.BAD_REQUEST(
        res,
        'Parece que el token ya fue usado',
        'Solicita un nuevo token'
      )
    }
    const salt = await bcrypt.genSalt(10)
    const newHashedPassword = await bcrypt.hash(newPassword, salt)
    await authService.updateResetTokenStatus(user.email, newHashedPassword)

    return httpResponse.OK(res, 'Su contraseña ah sido cambiado')
  } catch (error) {
    next(error)
  } finally {
    console.log('Forgot password finalized')
  }
}
