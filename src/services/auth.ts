// Iria registro y login
import { PrismaClient } from '@prisma/client'

import type { BodyUserType } from '../types/user'

const prisma = new PrismaClient()

export const authService = {
  register: async (data: BodyUserType) => {
    return await prisma.user.create({ data })
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
