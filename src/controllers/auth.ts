// Aca tiene que estar el controler para el registro e inicio de sesion  -Sacar createUser y poner register

import type { Response, Request, NextFunction } from 'express'

import type { BodyUserType } from '../types/user'
import type {
  BodyEmailType,
  BodyLoginType,
  BodyNewPasswordTokenType,
  ParamsNewPasswordTokenType
} from '../types/auth'

import { httpResponse } from '../helpers/httpStatus'
import { authService } from '../services/auth'
import bcrypt from 'bcrypt'

import {
  generateToken,
  verifyToken,
  generateResetToken,
  verifyResetToken
} from '../helpers/token'

import { sendEmail } from '../helpers/mailControl'

export const register = async (
  req: Request<unknown, unknown, BodyUserType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body
    // Normalizacion de datos como mail

    const newObject = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        return key === 'password' || key === 'phone'
          ? [key, value.trim()]
          : [key, value.toLowerCase().trim()]
      })
    ) as BodyUserType

    console.log(newObject)
    // Hasheo de password
    const password = data.password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newData: BodyUserType = {
      ...newObject,
      password: hashedPassword
    }
    const user = await authService.register(newData)
    return httpResponse.CREATED(res, user.firstName)
  } catch (error) {
    next(error)
  } finally {
    console.log('Create users finalized')
  }
}

export const login = async (
  req: Request<unknown, unknown, BodyLoginType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req
    const data = body

    const { email, password } = data

    const user = await authService.findEmail(email)
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
