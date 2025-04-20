import { z } from 'zod'

export const assignOrderSchema = z.object({
  rutaId: z.number().int().positive("La ruta es requerida"),
  transportistaId: z.number().int().positive("El transportista es requerido")
})
