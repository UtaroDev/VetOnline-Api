import type { Response, Request, NextFunction } from 'express'
import type {
  BodyProfileType,
  BodyUpdateProfileType,
  IdProfileType
} from '../types/profile'

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
    const { userIdRequest, userIsAdmin } = req
    const { id } = req.params
    const profile = await profileService.getOne(id)
    if (profile === null) {
      return httpResponse.NOT_FOUND(res, 'Profile not found not found')
    }
    if (
      !isAuthorized({ userIsAdmin, userIdRequest, userIdData: profile.userId })
    ) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
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
    const newObject = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        return key === 'userId'
          ? [key, value]
          : [key, value.toLowerCase().trim()]
      })
    ) as BodyProfileType

    const newProfile = await profileService.create(newObject)
    return httpResponse.CREATED(res, newProfile)
  } catch (error) {
    next(error)
  } finally {
    console.log('Updated profile finalized')
  }
}

export const updateProfile = async (
  req: Request<IdProfileType, unknown, BodyUpdateProfileType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body, params, userIsAdmin, userIdRequest } = req
    const { id } = params
    const data = body
    const profile = await profileService.getOne(id)

    // Comprobacion de que el userId al que le va a generar la relacion sea el mismo que el suyo
    if (data?.userId !== userIdRequest && data?.userId !== undefined) {
      return httpResponse.UNPROCESSABLE_ENTITY(
        res,
        'Error al intentar cambiar id',
        'No puedes cambiar de id'
      )
    }
    if (profile === null) {
      return httpResponse.NOT_FOUND(res, 'Profile not found')
    }
    const dataId = profile?.userId
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: dataId })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    const newObject = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        return key === 'userId'
          ? [key, value]
          : [key, value.toLowerCase().trim()]
      })
    ) as BodyUpdateProfileType

    const profileUpdated = await profileService.update(id, newObject)
    return httpResponse.OK(res, profileUpdated)
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
    const profile = await profileService.getOne(id)
    if (profile === null) {
      return httpResponse.NOT_FOUND(res, 'Profile not found')
    }
    const dataId = profile?.userId
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: dataId })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    const profileDeleted = await profileService.delete(id)
    return httpResponse.OK(res, profileDeleted)
  } catch (error) {
    next(error)
  } finally {
    console.log('Profile has deleted')
  }
}
