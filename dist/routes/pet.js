"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const pet_1 = require("../controllers/pet");
const schemaValidator_1 = require("../middlewares/schemaValidator");
const pet_2 = require("../schemas/pet");
const router = (0, express_1.Router)();
exports.router = router;
router
    .route('/')
    .get(pet_1.getAllPets)
    .post((0, schemaValidator_1.schemaValidator)(pet_2.bodyPetSchema), pet_1.createPet);
router
    .route('/:id')
    .get((0, schemaValidator_1.schemaValidator)(pet_2.idPetSchema), pet_1.getPet)
    .put((0, schemaValidator_1.schemaValidator)(pet_2.updatePetSchema), pet_1.updatePet)
    .delete(pet_1.deletePet);
