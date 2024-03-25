import type { Response, Request, NextFunction } from 'express'

import type { IdUserType, BodyUserSchema, BodyUpdateUser } from '../types/user'
import { httpResponse } from '../helpers/httpStatus'
import { userService } from '../services/user'

import { isAdmin, isAuthorized } from '../helpers/autorizedResources'
import bcrypt from 'bcrypt'
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userIsAdmin } = req
    if (!isAdmin(userIsAdmin)) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for resource')
    }
    const users = await userService.getAll()
    return httpResponse.OK(res, users)
  } catch (error) {
    next(error)
  } finally {
    console.log('Termino la peticion de buscar todas las mascotas')
  }
}

export const getUser = async (
  req: Request<IdUserType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userIsAdmin, userIdRequest, params } = req
    const { id } = params
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: id })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for resource')
    }
    const user = await userService.getOne(id)
    return httpResponse.OK(res, user)
  } catch (error) {
    next(error)
  } finally {
    console.log('Termino la peticion de buscar todas las mascotas')
  }
}

export const register = async (
  req: Request<unknown, unknown, BodyUserSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body
    // Normalizacion del mail
    const emailNormalized = data.email.toLowerCase().trim()
    // Hasheo de password
    const password = data.password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newData: BodyUserSchema = {
      email: emailNormalized,
      password: hashedPassword
    }
    const user = await userService.create(newData)
    return httpResponse.CREATED(res, user)
  } catch (error) {
    next(error)
  } finally {
    console.log('Create users finalized')
  }
}

export const updateUser = async (
  req: Request<IdUserType, unknown, BodyUpdateUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { params, body, userIsAdmin, userIdRequest } = req
    const { id } = params
    const data = body
    console.log(id)
    console.log(userIdRequest, userIsAdmin)
    const user = await userService.getOne(id)
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: user?.id })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for resource')
    }
    console.log('Hola')
    const emailNormalized = data?.email?.toLowerCase().trim()
    let hashedPassword = data?.password

    // Hasheo de password
    if (
      data?.password !== '' &&
      data.password !== null &&
      data?.password !== undefined
    ) {
      const password = data.password
      const salt = await bcrypt.genSalt(10)
      hashedPassword = await bcrypt.hash(password, salt)
    }
    const newData: BodyUpdateUser = {
      email: emailNormalized,
      password: hashedPassword
    }
    const userUpdated = await userService.update(id, newData)
    console.log(userUpdated)
    return httpResponse.OK(res, userUpdated)
  } catch (error) {
    next(error)
  } finally {
    console.log('Update user finalized')
  }
}

export const deleteUser = async (
  req: Request<IdUserType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userIsAdmin, userIdRequest, params } = req
    const { id } = params
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: id })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for resource')
    }
    const user = await userService.delete(id)
    return httpResponse.OK(res, user)
  } catch (error) {
    next(error)
  } finally {
    console.log('Termino la peticion de buscar todas las mascotas')
  }
}
