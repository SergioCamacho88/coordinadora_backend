import { Router } from "express";
import {
  createOrderController,
  assignOrderController,
  getOrdersController,
  getOrderStatusController,
  updateOrderStatusController,
  getOrderHistoryController,
} from "./orders.controller";
import { createOrderSchema } from "../../schemas/orderSchemas";
import { assignOrderSchema } from "../../schemas/assignOrderSchema";
import { validateSchema } from "../../middlewares/validateSchema";
import { getUserOrderHistoryController } from "../../controllers/orderHistory.controller";
import { authenticate } from "../../middlewares/authMiddleware";

const router = Router();
router.get("/orders/history", authenticate, getUserOrderHistoryController);

router.post(
  "/orders",
  validateSchema(createOrderSchema),
  createOrderController
);
router.post(
  "/orders/:orderId/assign",
  validateSchema(assignOrderSchema),
  assignOrderController
);
router.get("/orders", getOrdersController);
router.get("/orders/:orderId/status", getOrderStatusController);
router.put("/orders/:orderId/status", updateOrderStatusController);
router.get("/orders/:id/history", getOrderHistoryController);

export default router;
