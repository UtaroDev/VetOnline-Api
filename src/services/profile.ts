import { PrismaClient } from '@prisma/client'

import type { BodyProfileType } from '../types/profile'

const prisma = new PrismaClient()

//  Logica de negocio
export const profileService = {
  create: async (data: BodyProfileType) => {
    return await prisma.profile.create({ data })
  },
  getAll: async () => {
    return await prisma.profile.findMany()
  },

  getOne: async (id: string) => {
    return await prisma.profile.findUnique({
      where: {
        id
      }
    })
  },

  update: async (id: string, data: BodyProfileType) => {
    return await prisma.profile.update({
      where: { id },
      data
    })
  },

  delete: async (id: string) => {
    return await prisma.profile.delete({ where: { id } })
  }
}
