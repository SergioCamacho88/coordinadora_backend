import { db } from '../config/mysql'

export const getTransportistas = async (onlyAvailable: boolean): Promise<any[]> => {
  let query = `SELECT * FROM transportistas`
  if (onlyAvailable) {
    query += ` WHERE is_available = TRUE`
  }
  query += ` ORDER BY name ASC`

  const [rows]: any = await db.query(query)
  return rows
}
