import { redisClient } from '../config/redis'
import { db } from '../config/mysql'
import { findUserById } from '../repositories/user.repository'
import { sendStatusUpdateEmail } from './mail.service'


const TTL_SECONDS = 300 // 5 minutos

type OrderStatus = 'En espera' | 'En tránsito' | 'Entregado'

const allowedTransitions: Record<OrderStatus, OrderStatus | null> = {
  'En espera': 'En tránsito',
  'En tránsito': 'Entregado',
  'Entregado': null
}


  
export const getOrderStatus = async (orderId: number): Promise<string> => {
  const redisKey = `order:${orderId}:status`

  // 1. Buscar en Redis
  const cached = await redisClient.get(redisKey)
  if (cached) return cached

  // 2. Consultar en MySQL
  const [rows]: any = await db.query(`SELECT status FROM orders WHERE id = ?`, [orderId])
  if (rows.length === 0) throw new Error('La orden no existe.')

  const status = rows[0].status

  // 3. Guardar en Redis
  await redisClient.setEx(redisKey, TTL_SECONDS, status)

  return status
}

export const updateOrderStatus = async (orderId: number, newStatus: string): Promise<void> => {
    const [rows]: any = await db.query(`SELECT status FROM orders WHERE id = ?`, [orderId])
    if (rows.length === 0) throw new Error('La orden no existe.')
  
    const currentStatus = rows[0].status as OrderStatus
    const nextAllowed = allowedTransitions[currentStatus]
  
    if (newStatus !== nextAllowed) {
      throw new Error(`No puedes cambiar de "${currentStatus}" a "${newStatus}"`)
    }
  
    await db.query(`UPDATE orders SET status = ? WHERE id = ?`, [newStatus, orderId])
    await redisClient.setEx(`order:${orderId}:status`, 300, newStatus)

      // Obtener ID del usuario para enviar el correo
  const [orderData]: any = await db.query(`SELECT user_id FROM orders WHERE id = ?`, [orderId])
  const user = await findUserById(orderData[0]?.user_id)

  if (user?.email) {
    await sendStatusUpdateEmail(user.email, orderId, newStatus)
  }
  await db.query(
    `INSERT INTO order_status_history (order_id, status) VALUES (?, ?)`,
    [orderId, newStatus]
  )
    // Actualizar Redis
    await redisClient.setEx(`order:${orderId}:status`, 300, newStatus)

    // Si la orden fue entregada, liberar transportista
    if (newStatus === 'Entregado') {
      const [asignacion]: any = await db.query(
        `SELECT transportista_id FROM order_assignments WHERE order_id = ?`,
        [orderId]
      )
  
      if (asignacion.length > 0) {
        const transportistaId = asignacion[0].transportista_id
        await db.query(
          `UPDATE transportistas SET is_available = TRUE WHERE id = ?`,
          [transportistaId]
        )
      }
    }
  

  }