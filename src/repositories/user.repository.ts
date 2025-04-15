import { db } from '../config/mysql'
import { User } from '../entities/User'

export const createUser = async (user: User): Promise<void> => {
  const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`
  await db.query(query, [user.name, user.email, user.password, user.role || 'user'])
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows]: any = await db.query(`SELECT * FROM users WHERE email = ?`, [email])
  return rows[0] || null
}
