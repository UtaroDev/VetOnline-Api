"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpResponse = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatus || (HttpStatus = {}));
exports.httpResponse = {
    OK: (res, data) => {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            statusMsg: 'Success',
            data
        });
    },
    CREATED: (res, data) => {
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            statusMsg: 'Created',
            data
        });
    },
    BAD_REQUEST: (res, message, errorData) => {
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            statusMsg: 'Bad Request',
            message,
            error: errorData
        });
    },
    UNAUTHORIZED: (res, message) => {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            statusMsg: 'Unauthorized',
            message
        });
    },
    FORBIDDEN: (res, message) => {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            statusMsg: 'Forbidden',
            message
        });
    },
    NOT_FOUND: (res, message) => {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            statusMsg: 'Not Found',
            message
        });
    },
    UNPROCESSABLE_ENTITY: (res, message, errorData) => {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            statusMsg: 'Unprocessable Entity',
            message,
            error: errorData
        });
    },
    INTERNAL_SERVER_ERROR: (res, message, error) => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            statusMsg: 'Internal Server Error',
            message,
            error: error.message
        });
    }
};
