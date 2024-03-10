import { z } from 'zod'

export const bodyUserSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2)
      .max(255)
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message:
          'El nombre solo puede contener letras de a a z (mayúsculas o minúsculas).'
      })
      .transform((value) => value.trim()),

    lastName: z
      .string()
      .min(2)
      .max(255)
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message:
          'El apellido solo puede contener letras de a a z (mayúsculas o minúsculas).'
      })
      .transform((value) => value.trim()),

    email: z
      .string()
      .email()
      .transform((value) => value.trim()),

    password: z
      .string()
      .min(8)
      .max(16)
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/.test(value),
        {
          message:
            'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.'
        }
      ),
    phone: z
      .string()
      .transform((value) => value.trim())
      .refine((value) => /^\d{6,12}$/.test(value), {
        message: 'El número de teléfono debe contener entre 6 y 12 dígitos.'
      })
      .transform((value) => value.trim()),

    address: z
      .string()
      .min(2)
      .max(255)
      .transform((value) => value.trim())
  })
})

export const idUserSchema = z.object({
  params: z.object({
    id: z.string().length(24)
  })
})

export const updateUserSchema = z.object({
  params: idUserSchema.shape.params,
  body: bodyUserSchema.shape.body
})
