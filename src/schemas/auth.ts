import { z } from 'zod'
export const bodyLoginSchema = z.object({
  body: z.object({
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
      )
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
