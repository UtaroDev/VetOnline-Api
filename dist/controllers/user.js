"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getAllUsers = void 0;
const httpStatus_1 = require("../helpers/httpStatus");
const user_1 = require("../services/user");
const getAllUsers = async (_req, res, next) => {
    try {
        const users = await user_1.userService.getAll();
        console.log('Llego esto la puta madsssre', users);
        return httpStatus_1.httpResponse.OK(res, users);
    }
    catch (error) {
        next(error);
    }
    finally {
        console.log('Get all users finalized');
    }
};
exports.getAllUsers = getAllUsers;
const createUser = async (req, res, next) => {
    try {
        const data = req.body;
        const user = await user_1.userService.create(data);
        return httpStatus_1.httpResponse.CREATED(res, user);
    }
    catch (error) {
        next(error);
    }
    finally {
        console.log('Create users finalized');
    }
};
exports.createUser = createUser;
