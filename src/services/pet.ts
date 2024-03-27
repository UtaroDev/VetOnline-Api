import { PrismaClient } from '@prisma/client'

import type { BodyPetType, BodyUpdatePetType } from '../types/pet'
const prisma = new PrismaClient()

export const petService = {
  getAll: async () => {
    return await prisma.pet.findMany()
  },
  getOne: async (id: string) => {
    return await prisma.pet.findUnique({
      where: {
        id
      }
    })
  },
  create: async (data: BodyPetType) => {
    return await prisma.pet.create({ data })
  },
  update: async (id: string, data: BodyUpdatePetType) => {
    return await prisma.pet.update({
      where: { id },
      data
    })
  },
  delete: async (id: string) => {
    return await prisma.pet.delete({
      where: { id }
    })
  }
}
