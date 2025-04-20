import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    await AuthService.register({ name, email, password })
    res.status(201).json({ message: 'Usuario registrado correctamente' })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const token = await AuthService.login(email, password)
    res.status(200).json({ token })
  } catch (err: any) {
    res.status(401).json({ error: err.message })
  }
}
