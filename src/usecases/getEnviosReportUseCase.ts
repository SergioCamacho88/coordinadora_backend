import { getEnviosReport } from '../repositories/report.repository'

export const getEnviosReportUseCase = async (filters: {
  estado?: string
  transportistaId?: number
  fechaInicio?: string
  fechaFin?: string
  limite?: number
  offset?: number
}) => {
  return await getEnviosReport(filters)
}
