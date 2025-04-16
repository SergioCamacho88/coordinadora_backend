import { Request, Response } from 'express'
import { getOrderStatus } from '../services/status.service'

export const getOrderStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = Number(req.params.id)
    if (isNaN(orderId)) {
      res.status(400).json({ error: 'ID de orden inválido' })
      return
    }

    const status = await getOrderStatus(orderId)
    res.status(200).json({ status })
  } catch (err: any) {
    res.status(404).json({ error: err.message })
  }
}
