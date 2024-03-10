import { z } from 'zod'
export const bodyLoginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email({
        message: 'Asegurate de que el email sea valido'
      })
      .transform((value) => value.trim().toLowerCase()),
    password: z.string().min(8, {
      message: 'La contraseña debe tener al menos 8 caracteres'
    })
  })
})

export const bodyEmailSchema = z.object({
  body: bodyLoginSchema.shape.body.pick({ email: true })
})

// Esquema para enpoind donde se crea una nueva contraseña con token
export const newPasswordTokenSchema = z.object({
  params: z.object({
    token: z.string()
  }),
  body: bodyLoginSchema.shape.body.pick({ password: true })
})
