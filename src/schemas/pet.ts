// Esquema de validaciones, en vez de usar Joi, uso Zod porque está hecho para TypeScript

import { z } from 'zod'
export const bodyPetSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2)
      .max(255)
      .transform((value) => value.trim())
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message:
          'El nombre solo puede contener letras de a a z (mayúsculas o minúsculas).'
      }),
    specie: z
      .string()
      .min(2)
      .max(255)
      .transform((value) => value.trim())
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: 'Asegúrate de que la especie especificada sea correcta'
      }),
    sex: z
      .string()
      .min(2)
      .max(255)
      .transform((value) => value.trim().toLowerCase())
      .refine((value) => /^(macho|hembra)$/.test(value), {
        message: 'Asegúrate de que el sexo especificado sea macho o hembra'
      }),
    size: z.enum(['pequeño', 'meadiano', 'grande']),
    qr: z.instanceof(Buffer),
    ownerId: z.string().length(24)
  })
})

export const idPetSchema = z.object({
  params: z.object({
    id: z.string().length(24)
  })
})

export const updatePetSchema = z.object({
  body: bodyPetSchema.shape.body,
  params: idPetSchema.shape.params
})
