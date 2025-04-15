import { User } from '../entities/User'
import { hashPassword } from '../utils/hash'
import { createUser, findUserByEmail } from '../repositories/user.repository'

export const registerUser = async (userData: User): Promise<void> => {
  const existingUser = await findUserByEmail(userData.email)
  if (existingUser) {
    throw new Error('El correo ya está registrado.')
  }

  const hashedPassword = await hashPassword(userData.password)
  const user: User = {
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    role: userData.role || 'user'
  }

  await createUser(user)
}
