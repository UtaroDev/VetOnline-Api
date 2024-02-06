import type { Response, Request, NextFunction } from 'express'

import type {
  BodyAppointmentType,
  IdAppointmentType
} from '../types/appointment'

import { httpResponse } from '../helpers/httpStatus'
import { appointmentService } from '../services/appointment'
import { isAdmin, isAuthorized } from '../helpers/autorizedResources'
import { petService } from '../services/pet'

const getAllAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userIsAdmin } = req
    if (!isAdmin(userIsAdmin)) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for resource')
    }
    const appointments = await appointmentService.getAll()
    return httpResponse.OK(res, appointments)
  } catch (error) {
    next(error)
  } finally {
    console.log('Termino la peticion de buscar todas las citas')
  }
}

const getAppointment = async (
  req: Request<IdAppointmentType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userIsAdmin, userIdRequest } = req
    const { id } = req.params
    const appointment = await appointmentService.getOne(id)
    if (appointment === null) {
      return httpResponse.NOT_FOUND(res, 'Appointment not found')
    }
    const { ownerId } = appointment
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: ownerId })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    return httpResponse.OK(res, appointment)
  } catch (error) {
    next(error)
  } finally {
    console.log('termino la peticion de appointment por id')
  }
}

const createAppointment = async (
  req: Request<unknown, unknown, BodyAppointmentType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userIsAdmin, userIdRequest } = req
    const data = req.body
    const { ownerId } = data
    if (!isAuthorized({ userIsAdmin, userIdRequest, userIdData: ownerId })) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    const pet = await petService.getOne(data.petId)
    if (pet === null || pet.ownerId !== userIdRequest) {
      return httpResponse.NOT_FOUND(res, 'Pet not found')
    }
    const appointment = await appointmentService.create(data)
    return httpResponse.CREATED(res, appointment)
  } catch (error) {
    next(error)
  } finally {
    console.log('appointment created')
  }
}

const updateAppointment = async (
  req: Request<IdAppointmentType, unknown, BodyAppointmentType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userIsAdmin, userIdRequest } = req
    const { id } = req.params
    const data = req.body
    const appointment = await appointmentService.getOne(id)
    if (appointment === null) {
      return httpResponse.NOT_FOUND(res, 'Appointment not found')
    }
    const { ownerId } = data
    if (
      !isAuthorized({
        userIsAdmin,
        userIdRequest,
        userIdData: ownerId
      })
    ) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    const pet = await petService.getOne(data.petId)
    if (pet === null || pet.ownerId !== userIdRequest) {
      return httpResponse.NOT_FOUND(res, 'Pet not found')
    }
    const appointmentUpdated = await appointmentService.update(id, data)
    return httpResponse.OK(res, appointmentUpdated)
  } catch (error) {
    next(error)
  } finally {
    console.log('Termino la peticion de actualizar appointment')
  }
}
const deleteAppointment = async (
  req: Request<IdAppointmentType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { userIdRequest, userIsAdmin } = req
    const appointment = await appointmentService.getOne(id)
    const ownerId = appointment?.ownerId
    if (
      !isAuthorized({
        userIsAdmin,
        userIdRequest,
        userIdData: ownerId
      })
    ) {
      return httpResponse.UNAUTHORIZED(res, 'Unauthorized for this action')
    }
    const appointmentDeleted = await appointmentService.delete(id)
    return httpResponse.OK(res, appointmentDeleted)
  } catch (error) {
    next(error)
  } finally {
    console.log('Termino la peticion de eliminar la appointment')
  }
}

export {
  getAllAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
}
