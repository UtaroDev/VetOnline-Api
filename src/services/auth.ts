import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authService = {
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
