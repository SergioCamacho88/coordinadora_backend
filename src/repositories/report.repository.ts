import { db } from '../config/mysql'

export const getEnviosReport = async (filters: {
  estado?: string
  transportistaId?: number
  fechaInicio?: string
  fechaFin?: string
  limite?: number
  offset?: number
}) => {
  const {
    estado = null,
    transportistaId = null,
    fechaInicio = null,
    fechaFin = null,
    limite = 10,
    offset = 0
  } = filters

  const query = `
    SELECT
      o.id AS orderId,
      o.status AS estado,
      TIMESTAMPDIFF(HOUR, MIN(sh.changed_at), MAX(sh.changed_at)) AS tiempoEntregaHoras,
      t.name AS transportista,
      MIN(sh.changed_at) AS fechaCreacion,
      MAX(sh.changed_at) AS fechaEntrega
    FROM orders o
    JOIN order_assignments oa ON oa.order_id = o.id
    JOIN transportistas t ON t.id = oa.transportista_id
    JOIN order_status_history sh ON sh.order_id = o.id
    WHERE 1 = 1
      AND (? IS NULL OR o.status = ?)
      AND (? IS NULL OR t.id = ?)
      AND (? IS NULL OR sh.changed_at >= ?)
      AND (? IS NULL OR sh.changed_at <= ?)
    GROUP BY o.id, o.status, t.name
    ORDER BY fechaEntrega DESC
    LIMIT ? OFFSET ?
  `

  const params = [
    estado, estado,
    transportistaId, transportistaId,
    fechaInicio, fechaInicio,
    fechaFin, fechaFin,
    limite, offset
  ]

  const [rows]: any = await db.query(query, params)
  return rows
}
export const getEnviosMetrics = async (filters: {
  estado?: string
  transportistaId?: number
  fechaInicio?: string
  fechaFin?: string
}) => {
  const {
    estado = null,
    transportistaId = null,
    fechaInicio = null,
    fechaFin = null
  } = filters

  const query = `
    SELECT
      COUNT(*) AS total,
      AVG(tiempoEntregaHoras) AS tiempoPromedioHoras
    FROM (
      SELECT
        o.id,
        TIMESTAMPDIFF(HOUR, MIN(sh.changed_at), MAX(sh.changed_at)) AS tiempoEntregaHoras
      FROM orders o
      JOIN order_assignments oa ON oa.order_id = o.id
      JOIN transportistas t ON t.id = oa.transportista_id
      JOIN order_status_history sh ON sh.order_id = o.id
      WHERE 1 = 1
        AND (? IS NULL OR o.status = ?)
        AND (? IS NULL OR t.id = ?)
        AND (? IS NULL OR sh.changed_at >= ?)
        AND (? IS NULL OR sh.changed_at <= ?)
      GROUP BY o.id
    ) AS sub
  `

  const params = [
    estado, estado,
    transportistaId, transportistaId,
    fechaInicio, fechaInicio,
    fechaFin, fechaFin
  ]

  const [rows]: any = await db.query(query, params)
  return rows
}
