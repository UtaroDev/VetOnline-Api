"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//  Logica de negocio
exports.userService = {
    getAll: async () => {
        return await prisma.user.findMany();
    },
    getOne: async (id) => {
        return await prisma.user.findUnique({
            where: {
                id
            }
        });
    },
    create: async (data) => {
        return await prisma.user.create({ data });
    },
    delete: async (id) => {
        return await prisma.user.delete({ where: { id } });
    }
};
