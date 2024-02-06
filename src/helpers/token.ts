// Aqui va funcion que recibe un usuario y devuelve un token con cierto payload

import type { BodyUserDataBaseType, PayloadJwtType } from '../types/auth'

import jwt from 'jsonwebtoken'
import type { Secret } from 'jsonwebtoken'
// Funcion que a partir de un usuario genera un token con datos en el payload

export const generateToken = (data: BodyUserDataBaseType) => {
  try {
    const token = jwt.sign(
      {
        userFirstName: data.firstName,
        userRole: data.role,
        userId: data.id
      },
      process.env.SECRET_KEY as Secret,
      { expiresIn: '1h' }
    )

    const refreshToken = jwt.sign(
      {
        userFirstName: data.firstName,
        userRole: data.role,
        userId: data.id,
        refresh: 'Es un rt !'
      },
      process.env.SECRET_REFRESH_KEY as Secret,
      { expiresIn: '10h' }
    )

    return { token, refreshToken }
  } catch (error) {
    throw new Error('Error al generar tokens')
  }
}

// Funcion que verifica token
export const verifyToken = (refreshToken: string) => {
  try {
    // Decodificar el refreshToken
    const decoded = jwt.verify(
      refreshToken,
      process.env.SECRET_REFRESH_KEY as Secret
    ) as PayloadJwtType

    // Extraer información del refreshToken
    const { userFirstName, userRole, userId, refresh } = decoded
    if (refresh === undefined) {
      throw new Error('Is a not token refresh')
    }
    // Generar un nuevo token
    const accessToken = jwt.sign(
      { userFirstName, userRole, userId },
      process.env.SECRET_KEY as Secret,
      { expiresIn: '1h' }
    )

    // Generar un nuevo refreshToken
    const newRefreshToken = jwt.sign(
      { userFirstName, userRole, userId, refresh: 'is a refresh token' },
      process.env.SECRET_REFRESH_KEY as Secret,
      { expiresIn: '10h' }
    )

    // Devolver los nuevos tokens
    return { accessToken, newRefreshToken }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const generateResetToken = (email: string): { resetToken: string } => {
  try {
    const resetToken = jwt.sign(
      {
        reset: 'is a reset?',
        email
      },
      process.env.SECRET_RESET_PASS_KEY as Secret,
      { expiresIn: '30m' }
    )
    return { resetToken }
  } catch (error: any) {
    throw new Error('Error al generar el token')
  }
}

export const verifyResetToken = (resetToken: string) => {
  try {
    // Decodificar el refreshToken
    const decoded = jwt.verify(
      resetToken,
      process.env.SECRET_RESET_PASS_KEY as Secret
    ) as PayloadJwtType

    if (decoded === undefined) {
      throw new Error('Error al verificar el token: El token es inválido')
    }
    return { decoded }
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Error en el token: Expirado')
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Error en el token: Invalido')
    } else {
      throw new Error('Error en el token')
    }
  }
}
