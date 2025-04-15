import { Router } from 'express'
import { getRutasController } from '../controllers/ruta.controller'
import { authenticate } from '../middlewares/authMiddleware'
import { isAdmin } from '../middlewares/roleMiddleware'

const router = Router()

router.get('/rutas', authenticate, isAdmin, getRutasController)

export default router
