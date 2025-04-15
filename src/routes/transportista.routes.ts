import { Router } from 'express'
import { authenticate } from '../middlewares/authMiddleware'
import { isAdmin } from '../middlewares/roleMiddleware'
import { getTransportistasController } from '../controllers/transportista.controller'

const router = Router()

router.get('/transportistas', authenticate, isAdmin, getTransportistasController)

export default router
