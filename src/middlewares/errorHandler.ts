import { Prisma } from '@prisma/client'
import type { NextFunction, Request, Response } from 'express'
import { httpResponse } from '../helpers/httpStatus'
import { ZodError } from 'zod'

const ERROR_HANDLER = {
  validationError: (res: Response, err: ZodError) => {
    const message = 'Validation error on request'
    const errorData = err.issues.map((issue) => ({
      message: issue.message,
      path: issue.path
    }))
    return httpResponse.UNPROCESSABLE_ENTITY(res, message, errorData)
  },
  P2002: (res: Response, err: Prisma.PrismaClientKnownRequestError) => {
    const message = 'Unique constraint failed'
    return httpResponse.BAD_REQUEST(res, message, err)
  },
  P2023: (res: Response, err: Prisma.PrismaClientKnownRequestError) => {
    const message = 'Unique constraint failed'
    return httpResponse.BAD_REQUEST(res, message, err)
  },
  prismaValidationError: (
    res: Response,
    err: Prisma.PrismaClientValidationError
  ) => {
    const message = 'Prisma validation error on request'
    return httpResponse.UNPROCESSABLE_ENTITY(res, message, err.message)
  },
  defaultError: (res: Response, err: any) => {
    const message = 'Internal server error'
    return httpResponse.INTERNAL_SERVER_ERROR(res, message, err)
  }
}

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let option = err.name

  if (option instanceof Prisma.PrismaClientValidationError) {
    option = 'prismaValidationError'
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    option = 'P2002'
  }

  if (err instanceof ZodError) {
    option = 'validationError'
  }

  const handler =
    ERROR_HANDLER[option as keyof typeof ERROR_HANDLER] ??
    ERROR_HANDLER.defaultError
  handler(res, err)
}
