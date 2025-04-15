import { Request, Response } from 'express'
import { createOrderUseCase } from '../usecases/createOrder'

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const user = req.user as { id: number }
    const { weight, dimensions, productType, destinationAddress } = req.body

    await createOrderUseCase({
      userId: user.id,
      weight,
      dimensions,
      productType,
      destinationAddress
    })

    res.status(201).json({ message: 'Orden creada correctamente' })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
