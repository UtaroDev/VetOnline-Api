import type { Response, Request, NextFunction } from 'express'
import type { BodyUserType, IdUserType } from '../types/user'

import { httpResponse } from '../helpers/httpStatus'
import { userService } from '../services/user'
import { isAdmin, isAuthorized } from '../helpers/autorizedResources'

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
    console.log('Get all users finalized')
  }
}

export const getUser = async (
  req: Request<IdUserType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userIsAdmin, userIdRequest } = req
    const { id } = req.params
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: id })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    const user = await userService.getOne(id)
    if (user === null) {
      return httpResponse.NOT_FOUND(res, 'User not found')
    }
    return httpResponse.OK(res, user)
  } catch (error) {
    next(error)
  } finally {
    console.log('get users finalized')
  }
}

export const updateUser = async (
  req: Request<IdUserType, unknown, BodyUserType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body, params, userIsAdmin, userIdRequest } = req
    const { id } = params
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: id })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    const user = await userService.update(id, body)
    return httpResponse.OK(res, user)
  } catch (error) {
    next(error)
  } finally {
    console.log('Updated user finalized')
  }
}

export const deleteUser = async (
  req: Request<IdUserType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { params, userIsAdmin, userIdRequest } = req
    const { id } = params
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: id })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    const user = await userService.delete(id)
    return httpResponse.OK(res, user)
  } catch (error) {
    next(error)
  } finally {
    console.log('User has deleted')
  }
}
