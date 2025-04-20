import { hashPassword, comparePasswords } from '../utils/hash'
import { generateToken } from '../utils/jwt'
import { findUserByEmail, createUser } from '../repositories/user.repository'
import { User } from '../entities/User'

export const AuthService = {
  register: async (userData: User): Promise<void> => {
    const existing = await findUserByEmail(userData.email)
    if (existing) throw new Error('El correo ya está registrado.')

    const hashed = await hashPassword(userData.password)
    await createUser({ ...userData, password: hashed })
  },

  login: async (email: string, password: string): Promise<string> => {
    const user = await findUserByEmail(email)
    if (!user || !(await comparePasswords(password, user.password))) {
      throw new Error('Credenciales incorrectas.')
    }

    return generateToken({ id: user.id, email: user.email, role: user.role })
  }
}
