import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecreto'

export const authenticate = (req: Request & { user?: JwtPayload & { id?: number; email?: string; role?: string } }, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token no proporcionado' })
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    if (typeof decoded === 'object' && decoded !== null) {
      req.user = decoded as JwtPayload & { id?: number; email?: string; role?: string }
      next()
    } else {
      res.status(401).json({ error: 'Token inválido' })
    }
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' })
    return
  }
}
