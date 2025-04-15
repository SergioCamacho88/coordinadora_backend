import { Router } from 'express'
import { createOrderController } from '../controllers/order.controller'
import { authenticate } from '../middlewares/authMiddleware'
import { validateSchema } from '../middlewares/validateSchema'
import { createOrderSchema } from '../schemas/orderSchemas'

const router = Router()

router.post(
  '/orders',
  authenticate,
  validateSchema(createOrderSchema),
  createOrderController
)

export default router
