import { db } from '../config/mysql'

export const getRutas = async (): Promise<any[]> => {
  const [rows]: any = await db.query(`SELECT * FROM rutas ORDER BY name ASC`)
  return rows
}
