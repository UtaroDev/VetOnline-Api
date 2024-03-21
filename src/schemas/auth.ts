// Esquema de validacion para y solo para el registro y logeo del usuario
import { z } from 'zod'
export const bodyAuthSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email({
        message: 'Asegurate de que el email sea valido'
      })
      .transform((value) => value.trim().toLowerCase()),
    password: z
      .string()
      .min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
      })
      .max(16, {
        message: 'La contraseña no debe tener mas de 16 caracteres'
      })
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/.test(value),
        {
          message:
            'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.'
        }
      )
  })
})

export const bodyEmailSchema = z.object({
  body: bodyAuthSchema.shape.body.pick({ email: true })
})

// Esquema para enpoind donde se crea una nueva contraseña con token
export const newPasswordTokenSchema = z.object({
  params: z.object({
    token: z.string()
  }),
  body: bodyAuthSchema.shape.body.pick({ password: true })
})
