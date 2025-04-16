import { Router } from 'express'
import { redisClient } from '../config/redis'
import { authenticate } from '../middlewares/authMiddleware'
import { isAdmin } from '../middlewares/roleMiddleware'

const router = Router()

// Obtener valor de una clave Redis
router.get('/debug/redis/:key', authenticate, isAdmin, async (req, res) => {
  const key = req.params.key
  try {
    const value = await redisClient.get(key)
    res.json({ key, value })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

// Ver todas las claves Redis (útil en desarrollo)
router.get('/debug/redis', authenticate, isAdmin, async (req, res) => {
  try {
    const keys = await redisClient.keys('*')
    res.json({ keys })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

export default router
