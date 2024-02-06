"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.updatePet = exports.createPet = exports.getPet = exports.getAllPets = void 0;
const httpStatus_1 = require("../helpers/httpStatus");
const pet_1 = require("../services/pet");
const getAllPets = async (_req, res, next) => {
    try {
        const pets = await pet_1.petService.getAll();
        return httpStatus_1.httpResponse.OK(res, pets);
    }
    catch (error) {
        next(error);
    }
    finally {
        console.log('Termino la peticion de buscar todas las mascotas');
    }
};
exports.getAllPets = getAllPets;
const getPet = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pet = await pet_1.petService.getOne(id);
        if (pet === null) {
            return httpStatus_1.httpResponse.NOT_FOUND(res, 'Pet not found');
        }
        return httpStatus_1.httpResponse.OK(res, pet);
    }
    catch (error) {
        next(error);
    }
    finally {
        console.log('Termino la peticion de mascota por id');
    }
};
exports.getPet = getPet;
const createPet = async (req, res, next) => {
    try {
        const data = req.body;
        const pet = await pet_1.petService.create(data);
        return httpStatus_1.httpResponse.CREATED(res, pet);
    }
    catch (error) {
        next(error);
    }
    finally {
        console.log('Termino la peticion de crear mascota');
    }
};
exports.createPet = createPet;
const updatePet = async (req, res, next) => {
    try {
        const { body, params } = req;
        const { id } = params;
        const pet = await pet_1.petService.update(id, body);
        return httpStatus_1.httpResponse.OK(res, pet);
    }
    catch (error) {
        next(error);
    }
    finally {
        console.log('Termino la peticion de actualizar mascota');
    }
};
exports.updatePet = updatePet;
const deletePet = async (req, res, next) => {
    try {
        const { params } = req;
        const { id } = params;
        const pet = await pet_1.petService.delete(id);
        return httpStatus_1.httpResponse.OK(res, pet);
    }
    catch (error) {
        next(error);
    }
    finally {
        console.log('Termino la peticion de borrar mascota');
    }
};
exports.deletePet = deletePet;
