"use strict";
// Esquema de validaciones, en vez de usar Joi, uso Zod porque esta hecho para typescript
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePetSchema = exports.idPetSchema = exports.bodyPetSchema = void 0;
const zod_1 = require("zod");
exports.bodyPetSchema = zod_1.z.object({
    body: zod_1.z.object({
        size: zod_1.z.string().min(1).max(255),
        name: zod_1.z.string().min(1).max(255),
        specie: zod_1.z.string().min(1).max(255),
        sex: zod_1.z.string().min(1).max(255),
        ownerId: zod_1.z.string().min(1).max(255)
    })
});
exports.idPetSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(24).max(24)
    })
});
exports.updatePetSchema = zod_1.z.object({
    body: exports.bodyPetSchema.shape.body,
    id: exports.idPetSchema.shape.params
});
