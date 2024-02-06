import { PrismaClient } from '@prisma/client'

import type { BodyAppointmentType } from '../types/appointment'
const prisma = new PrismaClient()

export const appointmentService = {
  getAll: async () => {
    return await prisma.appointment.findMany()
  },
  getOne: async (id: string) => {
    return await prisma.appointment.findUnique({
      where: {
        id
      }
    })
  },
  create: async (data: BodyAppointmentType) => {
    return await prisma.appointment.create({ data })
  },
  update: async (id: string, data: BodyAppointmentType) => {
    return await prisma.appointment.update({ where: { id }, data })
  },
  delete: async (id: string) => {
    return await prisma.appointment.delete({
      where: { id }
    })
  }
}
