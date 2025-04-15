import { db } from '../config/mysql'

export const createOrder = async (order: {
  userId: number,
  weight: number,
  dimensions: string,
  productType: string,
  destinationAddress: string
}) => {
  const query = `
    INSERT INTO orders 
      (user_id, weight, dimensions, product_type, destination_address, status) 
    VALUES (?, ?, ?, ?, ?, 'En espera')
  `
  await db.query(query, [
    order.userId,
    order.weight,
    order.dimensions,
    order.productType,
    order.destinationAddress
  ])
}
