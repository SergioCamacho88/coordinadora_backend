import { createOrder } from '../repositories/order.repository'
import { validateAddress } from '../services/address.service'
import { findUserById } from '../repositories/user.repository'
import { sendConfirmationEmail } from '../services/mail.service'

export const createOrderUseCase = async (data: {
  userId: number
  weight: number
  dimensions: string
  productType: string
  destinationAddress: string
}) => {
  const isValid = await validateAddress(data.destinationAddress)

  if (!isValid) {
    throw new Error('La dirección de destino no es válida.')
  }

  await createOrder(data)

  // 🚀 Enviar notificación por correo
  const user = await findUserById(data.userId)
  if (user?.email) {
    await sendConfirmationEmail(user.email, data)
  }
}
