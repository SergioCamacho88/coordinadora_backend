import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'La contraseña debe tener mínimo 6 caracteres')
})

export const loginSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Contraseña requerida')
})
