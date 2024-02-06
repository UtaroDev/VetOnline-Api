import jwt from 'jsonwebtoken'
import type { Secret } from 'jsonwebtoken'
import type { NextFunction, Request, Response } from 'express'
import { httpResponse } from '../helpers/httpStatus'
import type { PayloadJwtType } from '../types/auth'
export const decodedPayload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headers = req.headers
    const { authorization } = headers
    const token = authorization?.split(' ')[1]
    if (token === undefined) {
      return httpResponse.BAD_REQUEST(
        res,
        'Ocurrio un error con el token',
        'Ocurrio un error: Token error'
      )
    }
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as Secret
    ) as PayloadJwtType
    req.userIsAdmin = decoded.userRole === 'admin'
    req.userIdRequest = decoded.userId
    next()
  } catch (error) {
    next(error)
  }
}
