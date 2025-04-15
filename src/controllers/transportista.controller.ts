import { Request, Response } from 'express'
import { getTransportistasUseCase } from '../usecases/getTransportistasUseCase'

export const getTransportistasController = async (req: Request, res: Response): Promise<void> => {
  try {
    const disponible = req.query.disponible === 'true'
    const transportistas = await getTransportistasUseCase(disponible)
    res.status(200).json({ data: transportistas })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
