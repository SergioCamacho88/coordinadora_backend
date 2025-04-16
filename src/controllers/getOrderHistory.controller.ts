import { Request, Response } from 'express'
import { db } from '../config/mysql'

export const getOrderHistoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = Number(req.params.id)
    if (isNaN(orderId)) {
      res.status(400).json({ error: 'ID inválido' })
      return
    }

    const [rows]: any = await db.query(
      `SELECT status, changed_at FROM order_status_history WHERE order_id = ? ORDER BY changed_at ASC`,
      [orderId]
    )

    res.status(200).json({ history: rows })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
