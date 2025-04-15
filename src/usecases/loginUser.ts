import { findUserByEmail } from '../repositories/user.repository'
import { comparePasswords } from '../utils/hash'
import { generateToken } from '../utils/jwt'

export const loginUser = async (email: string, password: string): Promise<string> => {
  const user = await findUserByEmail(email)
  if (!user) {
    throw new Error('Credenciales incorrectas.')
  }

  const isValid = await comparePasswords(password, user.password)
  if (!isValid) {
    throw new Error('Credenciales incorrectas.')
  }

  const token = generateToken({ id: user.id, email: user.email, role: user.role })
  return token
}
