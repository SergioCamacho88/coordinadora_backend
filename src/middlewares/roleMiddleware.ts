import { Request, Response, NextFunction } from 'express'

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user as any

  if (!user || user.role !== 'admin') {
    res.status(403).json({ error: 'Acceso denegado: solo administradores' })
    return
  }

  next()
}
