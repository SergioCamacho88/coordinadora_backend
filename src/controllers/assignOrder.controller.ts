import { Request, Response } from 'express'
import { assignOrderUseCase } from '../usecases/assignOrderUseCase'

export const assignOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = Number(req.params.id)
    const { rutaId, transportistaId } = req.body

    if (isNaN(orderId)) {
      res.status(400).json({ error: 'ID de la orden no válido' })
      return
    }

    await assignOrderUseCase({ orderId, rutaId, transportistaId })

    res.status(200).json({ message: 'Orden asignada correctamente' })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}
