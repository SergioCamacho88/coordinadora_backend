import { db } from '../config/mysql'
import { assignOrder } from '../repositories/orderAssignment.repository'
import { findUserById } from '../repositories/user.repository'
import { sendAssignmentEmail } from '../services/mail.service'
import { notifyClients } from '../index'

export const assignOrderUseCase = async (data: {
  orderId: number
  rutaId: number
  transportistaId: number
}) => {

  // 1. Validar orden en estado "En espera"
  const [orders]: any = await db.query(
    `SELECT * FROM orders WHERE id = ? AND status = 'En espera'`,
    [data.orderId]
  )
  if (orders.length === 0) {
    throw new Error('La orden no existe o no está en estado "En espera".')
  }
  const order = orders[0]

  // 2. Validar ruta
  const [rutas]: any = await db.query(`SELECT * FROM rutas WHERE id = ?`, [data.rutaId])
  if (rutas.length === 0) {
    throw new Error('La ruta no existe.')
  }

  // 3. Validar transportista disponible
  const [transportistas]: any = await db.query(
    `SELECT * FROM transportistas WHERE id = ? AND is_available = TRUE`,
    [data.transportistaId]
  )
  if (transportistas.length === 0) {
    throw new Error('El transportista no está disponible o no existe.')
  }

  const transportista = transportistas[0]

  // 4. Validar capacidad del transportista vs peso de la orden
  if (order.weight > transportista.capacity) {
    throw new Error(`El peso del envío (${order.weight}kg) excede la capacidad del transportista (${transportista.capacity}kg).`)
  }

  // 5. Asignar orden
  await assignOrder(data.orderId, data.rutaId, data.transportistaId)

  //6. guardar order_status_history
  await db.query(
    `INSERT INTO order_status_history (order_id, status) VALUES (?, ?)`,
    [data.orderId, 'En tránsito']
  )

  await notifyClients({
    type: 'status_update',
    orderId: data.orderId,
    newStatus: 'En tránsito',
    updatedAt: new Date().toISOString()
  })
  

  // 7. Obtener usuario y enviar correo
  const user = await findUserById(order.user_id)
  if (user?.email) {
    await sendAssignmentEmail(user.email, order, rutas[0], transportista)
  }

}
