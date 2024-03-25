// Iria registro y login
import type { BodyUserSchema, BodyUpdateUser } from '../types/user'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const userService = {
  getAll: async () => {
    return await prisma.user.findMany({})
  },
  getOne: async (id: string) => {
    return await prisma.user.findUnique({ where: { id } })
  },
  create: async (data: BodyUserSchema) => {
    return await prisma.user.create({ data })
  },
  delete: async (id: string) => {
    return await prisma.user.delete({
      where: { id }
    })
  },
  update: async (id: string, newData: BodyUpdateUser) => {
    return await prisma.user.update({
      where: { id },
      data: newData
    })
  }
}
