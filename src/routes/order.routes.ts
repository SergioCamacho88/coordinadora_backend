import { Router } from 'express'
import { createOrderController } from '../controllers/order.controller'
import { authenticate } from '../middlewares/authMiddleware'
import { validateSchema } from '../middlewares/validateSchema'
import { createOrderSchema } from '../schemas/orderSchemas'
import { assignOrderController } from '../controllers/assignOrder.controller'
import { assignOrderSchema } from '../schemas/assignOrderSchema'
import { getOrdersController } from '../controllers/getOrders.controller'
import { isAdmin } from '../middlewares/roleMiddleware'
import { getOrderStatusController } from '../controllers/orderStatus.controller'
import { updateOrderStatusController } from '../controllers/updateOrderStatus.controller'
import { getOrderHistoryController } from '../controllers/getOrderHistory.controller'


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

router.get(
  '/orders/:id/status',
  authenticate, // usuarios autenticados pueden consultar sus órdenes
  getOrderStatusController
)

router.put(
  '/orders/:id/status',
  authenticate,
  isAdmin,
  updateOrderStatusController
)

router.get(
  '/orders/:id/history',
  authenticate,
  getOrderHistoryController
)

export default router
