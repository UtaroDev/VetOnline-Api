// Esquema de validacion para y solo para el registro y logeo del usuario
import { z } from 'zod'
export const bodyUserSchema = z.object({
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
export const idUserSchema = z.object({
  params: z.object({
    id: z.string().length(24, { message: 'Es necesario un id valido' })
  })
})

// Partial referencia a: typado opcional con zod para cuando se tenga que actualizar datos en un patch
export const updateBodyUserSchema = z.object({
  body: bodyUserSchema.shape.body.partial()
})

export const updateUserSchema = z.object({
  body: updateBodyUserSchema.shape.body,
  params: idUserSchema.shape.params
})

// Solo para busquedas especificas
export const bodyEmailSchema = z.object({
  body: bodyUserSchema.shape.body.pick({ email: true })
})

// Esquema para enpoind donde se crea una nueva contraseña con token
export const newPasswordTokenSchema = z.object({
  params: z.object({
    token: z.string()
  }),
  body: bodyUserSchema.shape.body.pick({ password: true })
})
