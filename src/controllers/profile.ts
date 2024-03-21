import type { Response, Request, NextFunction } from 'express'
import type { BodyProfileType, IdProfileType } from '../types/profile'

import { httpResponse } from '../helpers/httpStatus'
import { profileService } from '../services/profile'
import { isAdmin, isAuthorized } from '../helpers/autorizedResources'

export const getAllProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userIsAdmin } = req
    if (!isAdmin(userIsAdmin)) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for resource')
    }
    const profiles = await profileService.getAll()
    return httpResponse.OK(res, profiles)
  } catch (error) {
    next(error)
  } finally {
    console.log('Get all users finalized')
  }
}

export const getProfile = async (
  req: Request<IdProfileType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const profile = await profileService.getOne(id)
    if (profile === null) {
      return httpResponse.NOT_FOUND(res, 'User not found')
    }
    return httpResponse.OK(res, profile)
  } catch (error) {
    next(error)
  } finally {
    console.log('get profile finalized')
  }
}

export const createProfile = async (
  req: Request<unknown, unknown, BodyProfileType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body, userIsAdmin, userIdRequest } = req
    const data = body
    const dataId = data?.userId
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: dataId })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    const profile = await profileService.create(data)
    return httpResponse.CREATED(res, profile)
  } catch (error) {
    next(error)
  } finally {
    console.log('Updated profile finalized')
  }
}

export const updateProfile = async (
  req: Request<IdProfileType, unknown, BodyProfileType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body, params, userIsAdmin, userIdRequest } = req
    const { id } = params
    const profileUser = await profileService.getOne(id)
    const dataId = profileUser?.userId
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: dataId })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    const profile = await profileService.update(id, body)
    return httpResponse.OK(res, profile)
  } catch (error) {
    next(error)
  } finally {
    console.log('Updated profile finalized')
  }
}

export const deleteProfile = async (
  req: Request<IdProfileType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { params, userIsAdmin, userIdRequest } = req
    const { id } = params
    const profileUser = await profileService.getOne(id)
    const dataId = profileUser?.userId
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: dataId })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    const profile = await profileService.delete(id)
    return httpResponse.OK(res, profile)
  } catch (error) {
    next(error)
  } finally {
    console.log('User has deleted')
  }
}
