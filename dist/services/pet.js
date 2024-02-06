"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.petService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.petService = {
    getAll: async () => {
        return await prisma.pet.findMany();
    },
    getOne: async (id) => {
        return await prisma.pet.findUnique({
            where: {
                id
            }
        });
    },
    create: async (data) => {
        return await prisma.pet.create({ data });
    },
    update: async (id, data) => {
        return await prisma.pet.update({
            where: { id },
            data
        });
    },
    delete: async (id) => {
        return await prisma.pet.delete({
            where: { id }
        });
    }
};
