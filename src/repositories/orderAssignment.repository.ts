import { db } from '../config/mysql'

// Asignar una orden a una ruta y transportista
export const assignOrder = async (orderId: number, rutaId: number, transportistaId: number): Promise<void> => {
  const insert = `
    INSERT INTO order_assignments (order_id, ruta_id, transportista_id)
    VALUES (?, ?, ?)
  `
  await db.query(insert, [orderId, rutaId, transportistaId])

  // Cambiar estado de la orden a "En tránsito"
  await db.query(`UPDATE orders SET status = 'En tránsito' WHERE id = ?`, [orderId])

  // Marcar transportista como no disponible
  await db.query(`UPDATE transportistas SET is_available = FALSE WHERE id = ?`, [transportistaId])
}
