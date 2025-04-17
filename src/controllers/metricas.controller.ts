import { Request, Response } from 'express'
import { getEnviosMetrics } from '../repositories/report.repository'

export const getEnviosMetricsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      estado,
      transportistaId,
      fechaInicio,
      fechaFin
    } = req.query

    const filters = {
      estado: estado as string,
      transportistaId: transportistaId ? Number(transportistaId) : undefined,
      fechaInicio: fechaInicio as string,
      fechaFin: fechaFin as string
    }

    const resumen = await getEnviosMetrics(filters)
    res.status(200).json(resumen[0] || { total: 0, tiempoPromedioHoras: 0 })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
