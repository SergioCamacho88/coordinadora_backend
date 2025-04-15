import { Request, Response } from 'express'
import { getOrdersUseCase } from '../usecases/getOrdersUseCase'

export const getOrdersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.query
    const orders = await getOrdersUseCase(status as string)
    res.status(200).json({ data: orders })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
