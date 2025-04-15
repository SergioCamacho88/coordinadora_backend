import { z } from 'zod'

export const createOrderSchema = z.object({
  weight: z.number().positive("El peso debe ser mayor a 0"),
  dimensions: z.string().min(1, "Las dimensiones son obligatorias"),
  productType: z.string().min(1, "El tipo de producto es obligatorio"),
  destinationAddress: z.string().min(5, "La dirección es obligatoria")
})
