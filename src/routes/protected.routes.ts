import { Router } from 'express'
import { authenticate } from '../middlewares/authMiddleware'

const router = Router()

router.get('/private', authenticate, (req, res) => {
  res.json({
    message: 'Accediste a una ruta protegida 🔐',
    user: req.user // incluye email, id y rol del token
  })
})

export default router
