import { z } from 'zod'

const AppointmentStateEnum = z.enum(['cancelada', 'reprogramada', 'aceptada'])

export const bodyAppointmentSchema = z.object({
  body: z
    .object({
      start: z.string().datetime().transform((value) => stringToDate(value)),
      end: z.string().datetime().transform((value) => stringToDate(value)),
      title: z
        .string()
        .min(3)
        .max(30)
        .transform((value) => value.trim()),
      description: z.string().transform((value) => value.trim()),
      area: z.string().transform((value) => value.trim()),
      state: z
        .string()
        .transform((value) => value.toLowerCase().trim())
        .refine((value) => AppointmentStateEnum.safeParse(value).success, {
          message:
            'El estado debe ser "cancelada", "reprogramada" o "aceptada".'
        }),
      doctorName: z.string().transform((value) => value.trim()),
      ownerId: z.string().length(24),
      petId: z.string().length(24)
    })
    .refine(({ start, end }) => new Date(start) < new Date(end), {
      message: 'La fecha de inicio debe ser anterior a la fecha de finalización'
    })
})

export const idAppointmentSchema = z.object({
  params: z.object({
    id: z.string().length(24)
  })
})

export const updateAppointmentSchema = z.object({
  body: bodyAppointmentSchema.shape.body,
  params: idAppointmentSchema.shape.params
})

// Funcion para estandarizar el guardado de fechas en la db
const stringToDate = (data: string): Date => {
  const newData = new Date(data)

  return newData
}
