import { Request, Response } from 'express'
import { updateOrderStatus } from '../services/status.service'

export const updateOrderStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = Number(req.params.id)
    const { status } = req.body

    if (isNaN(orderId) || typeof status !== 'string') {
      res.status(400).json({ error: 'Datos inválidos' })
      return
    }

    await updateOrderStatus(orderId, status)
    res.status(200).json({ message: 'Estado actualizado correctamente' })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}
