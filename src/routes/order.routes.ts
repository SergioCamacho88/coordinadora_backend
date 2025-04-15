import { Router } from 'express'
import { createOrderController } from '../controllers/order.controller'
import { authenticate } from '../middlewares/authMiddleware'
import { validateSchema } from '../middlewares/validateSchema'
import { createOrderSchema } from '../schemas/orderSchemas'
import { assignOrderController } from '../controllers/assignOrder.controller'
import { assignOrderSchema } from '../schemas/assignOrderSchema'
import { getOrdersController } from '../controllers/getOrders.controller'
import { isAdmin } from '../middlewares/roleMiddleware'



const router = Router()

router.post(
  '/orders/:id/assign',
  authenticate,
  isAdmin,
  validateSchema(assignOrderSchema),
  assignOrderController
)

router.post(
  '/orders',
  authenticate,
  validateSchema(createOrderSchema),
  createOrderController
)

router.get(
  '/orders',
  authenticate,
  isAdmin,
  getOrdersController
)
export default router
