import { createOrder } from '../repositories/order.repository'
import { validateAddress } from '../services/address.service'

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
}
