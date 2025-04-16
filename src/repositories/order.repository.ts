import { db } from '../config/mysql'

export const createOrder = async (order: {
  userId: number,
  weight: number,
  dimensions: string,
  productType: string,
  destinationAddress: string
}): Promise<number> => {
  const query = `
    INSERT INTO orders 
      (user_id, weight, dimensions, product_type, destination_address, status) 
    VALUES (?, ?, ?, ?, ?, 'En espera')
  `
  const [result]: any = await db.query(query, [
    order.userId,
    order.weight,
    order.dimensions,
    order.productType,
    order.destinationAddress
  ])
  return result.insertId
}

export const getOrders = async (status?: string): Promise<any[]> => {
  let query = `SELECT * FROM orders`
  const params: any[] = []

  if (status) {
    query += ` WHERE status = ?`
    params.push(status)
  }

  query += ` ORDER BY created_at DESC`

  const [rows]: any = await db.query(query, params)
  return rows
}