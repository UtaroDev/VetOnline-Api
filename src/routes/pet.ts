import { Router } from 'express'
import {
  getAllPets,
  getPet,
  createPet,
  updatePet,
  deletePet
} from '../controllers/pet'

import { schemaValidator } from '../middlewares/schemaValidator'
import { bodyPetSchema, idPetSchema, updatePetSchema } from '../schemas/pet'
import { decodedPayload } from '../middlewares/decodePayload'
const router = Router()

router.route('/').get(decodedPayload, getAllPets).post(
  schemaValidator(bodyPetSchema),
  decodedPayload,

  createPet
)

router
  .route('/:id')
  .get(schemaValidator(idPetSchema), decodedPayload, getPet)
  .patch(schemaValidator(updatePetSchema), decodedPayload, updatePet)
  .delete(schemaValidator(idPetSchema), decodedPayload, deletePet)

export { router }
