// Iria registro y login
import { PrismaClient } from '@prisma/client'
import type { BodyAuthType } from '../types/auth'
const prisma = new PrismaClient()

export const authService = {
  register: async (data: BodyAuthType) => {
    return await prisma.user.create({ data })
  },
  updateAuthData: async (email: string, newData: BodyAuthType) => {
    return await prisma.user.update({
      where: { email },
      data: newData
    })
  },
  deleteAccount: async (email: string) => {
    return await prisma.user.delete({
      where: { email }
    })
  },
  findEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email
      }
    })
  },
  updateResetToken: async (email: string, resetTokenData: string) => {
    return await prisma.user.update({
      where: { email },
      data: { resetToken: resetTokenData, resetTokenStatus: false }
    })
  },
  updateResetTokenStatus: async (email: string, newPassword: string) => {
    return await prisma.user.update({
      where: { email },
      data: { resetTokenStatus: true, password: newPassword }
    })
  }
}
