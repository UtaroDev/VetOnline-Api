import type { Response, Request, NextFunction } from 'express'
// Se usan los tipos
import type { IdPetType, BodyPetType, BodyUpdatePetType } from '../types/pet'

import { httpResponse } from '../helpers/httpStatus'
import { petService } from '../services/pet'
import { isAdmin, isAuthorized } from '../helpers/autorizedResources'

const getAllPets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userIsAdmin } = req
    if (!isAdmin(userIsAdmin)) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for resource')
    }
    const pets = await petService.getAll()
    return httpResponse.OK(res, pets)
  } catch (error) {
    next(error)
  } finally {
    console.log('Termino la peticion de buscar todas las mascotas')
  }
}

const getPet = async (
  req: Request<IdPetType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { userIsAdmin, userIdRequest } = req
    const pet = await petService.getOne(id)
    if (pet === null) {
      return httpResponse.NOT_FOUND(res, 'Pet not found')
    }
    const { ownerId } = pet
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: ownerId })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    return httpResponse.OK(res, pet)
  } catch (error) {
    next(error)
  } finally {
    console.log('Termino la peticion de mascota por id')
  }
}

const createPet = async (
  req: Request<unknown, unknown, BodyPetType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body
    const { userIsAdmin, userIdRequest } = req
    const { ownerId } = data
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: ownerId })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    const newObject = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (key === 'ownerId') {
          return [key, value]
        }
        return [key, value.toLowerCase().trim()]
      })
    ) as BodyPetType
    const pet = await petService.create(newObject)
    return httpResponse.CREATED(res, pet)
  } catch (error) {
    next(error)
  } finally {
    console.log('Termino la peticion de crear mascota')
  }
}

const updatePet = async (
  req: Request<IdPetType, unknown, BodyUpdatePetType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body, params, userIdRequest, userIsAdmin } = req
    const { id } = params
    const pet = await petService.getOne(id)
    const ownerId = pet?.ownerId

    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: ownerId })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    if (body.ownerId !== userIdRequest) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    const newObject = Object.fromEntries(
      Object.entries(body).map(([key, value]) => {
        if (key === 'ownerId') {
          return [key, value]
        }
        return [key, value.toLowerCase().trim()]
      })
    ) as BodyUpdatePetType
    const petUpdated = await petService.update(id, newObject)
    return httpResponse.OK(res, petUpdated)
  } catch (error) {
    next(error)
  } finally {
    console.log('Termino la peticion de actualizar mascota')
  }
}

const deletePet = async (
  req: Request<IdPetType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { params, userIsAdmin, userIdRequest } = req
    const { id } = params
    const pet = await petService.getOne(id)
    const ownerId = pet?.ownerId
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: ownerId })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    const deletedPet = await petService.delete(id)
    return httpResponse.OK(res, deletedPet)
  } catch (error) {
    next(error)
  } finally {
    console.log('Termino la peticion de borrar mascota')
  }
}
export { getAllPets, getPet, createPet, updatePet, deletePet }
