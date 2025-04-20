import { Request, Response } from 'express'
import { getRutasUseCase } from '../usecases/getRutasUseCase'

export const getRutasController = async (req: Request, res: Response): Promise<void> => {
  try {
    const rutas = await getRutasUseCase()
    res.status(200).json({ data: rutas })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
