// Validacion pensada para el perfil del usuario
import { z } from 'zod'

export const bodyProfileSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2, {
        message: 'El nombre debe contener al menos 2 letras'
      })
      .max(255, {
        message: 'El nombre solo puede contener 255 letras'
      })
      .transform((value) => value.trim())
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message:
          'El nombre solo puede contener letras de a a z (mayúsculas o minúsculas).'
      }),

    lastName: z
      .string()
      .min(2, {
        message: 'El apellido debe contener al menos 2 letras'
      })
      .max(255, {
        message: 'El apellido solo puede contener 255 letras'
      })
      .transform((value) => value.trim())
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message:
          'El apellido solo puede contener letras de a a z (mayúsculas o minúsculas).'
      }),
    phone: z
      .string()
      .transform((value) => value.trim())
      .refine((value) => /^\d{6,12}$/.test(value), {
        message: 'El número de teléfono debe contener entre 6 y 12 dígitos.'
      }),
    address: z
      .string()
      .min(2, {
        message: 'La direccion debe contener al menos 2 caracteres'
      })
      .max(255, {
        message: 'La direccion no puede superar los 255 caracteres'
      }),
    userId: z.string().length(24)
  })
})

export const idProfileSchema = z.object({
  params: z.object({
    id: z.string().length(24)
  })
})

export const updateProfileSchema = z.object({
  params: idProfileSchema.shape.params,
  body: bodyProfileSchema.shape.body
})
