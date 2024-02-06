"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const client_1 = require("@prisma/client");
const httpStatus_1 = require("../helpers/httpStatus");
// import { ZodError } from 'zod'
const ERROR_HANDLER = {
    // validationError: (res: Response, err: ZodError) => {
    //   const message = 'Validation error on request'
    //   const errorData = err.issues.map((issue) => ({
    //     message: issue.message,
    //     path: issue.path
    //   }))
    //   return httpResponse.UNPROCESSABLE_ENTITY(res, message, errorData)
    // },
    P2002: (res, err) => {
        const message = 'Unique constraint failed';
        return httpStatus_1.httpResponse.BAD_REQUEST(res, message, err);
    },
    P2023: (res, err) => {
        const message = 'Unique constraint failed';
        return httpStatus_1.httpResponse.BAD_REQUEST(res, message, err);
    },
    prismaValidationError: (res, err) => {
        const message = 'Prisma validation error on request';
        return httpStatus_1.httpResponse.UNPROCESSABLE_ENTITY(res, message, err.message);
    },
    defaultError: (res, err) => {
        const message = 'Internal server error';
        return httpStatus_1.httpResponse.INTERNAL_SERVER_ERROR(res, message, err);
    }
};
const errorHandler = (err, _req, res, _next) => {
    let option = err?.name;
    console.log(err);
    if (option instanceof client_1.Prisma.PrismaClientValidationError) {
        option = 'prismaValidationError';
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        option = 'prismaValidationError';
    }
    // if (err instanceof ZodError) {
    //   option = 'validationError'
    // }
    const handler = ERROR_HANDLER[option] ??
        ERROR_HANDLER.defaultError;
    handler(res, err);
};
exports.errorHandler = errorHandler;
