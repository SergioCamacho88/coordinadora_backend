import { getOrders } from '../repositories/order.repository'

export const getOrdersUseCase = async (status?: string) => {
  return await getOrders(status)
}
