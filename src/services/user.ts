import { PrismaClient } from '@prisma/client'

import type { BodyUserType } from '../types/user'

const prisma = new PrismaClient()

//  Logica de negocio
export const userService = {
  getAll: async () => {
    return await prisma.user.findMany()
  },

  getOne: async (id: string) => {
    return await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        appointment: true,
        pet: true
      }
    })
  },

  update: async (id: string, data: BodyUserType) => {
    return await prisma.user.update({
      where: { id },
      data
    })
  },

  delete: async (id: string) => {
    return await prisma.user.delete({ where: { id } })
  }
}
