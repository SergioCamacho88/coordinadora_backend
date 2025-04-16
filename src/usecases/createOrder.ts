import { createOrder } from '../repositories/order.repository'
import { validateAddress } from '../services/address.service'
import { findUserById } from '../repositories/user.repository'
import { sendConfirmationEmail } from '../services/mail.service'
import { db } from '../config/mysql'
import { notifyClients } from '../index'

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

  // 1. Crear la orden y obtener su ID
  const orderId = await createOrder(data)

  // 2. Insertar el estado inicial en el historial
  await db.query(
    `INSERT INTO order_status_history (order_id, status) VALUES (?, ?)`,
    [orderId, 'En espera']
  )
  await notifyClients({
    type: 'status_update',
    orderId,
    newStatus: 'En espera',
    updatedAt: new Date().toISOString()
  })
  
  
  // 3. Obtener email del usuario
  const user = await findUserById(data.userId)
  if (user?.email) {
    await sendConfirmationEmail(user.email, data)
  }
}
