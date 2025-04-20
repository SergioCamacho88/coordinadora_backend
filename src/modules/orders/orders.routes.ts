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
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear una nueva orden de envío
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               peso:
 *                 type: number
 *               dimensiones:
 *                 type: string
 *               tipoProducto:
 *                 type: string
 *               direccionDestino:
 *                 type: string
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *       400:
 *         description: Error en los datos enviados
 */

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

/**
 * @swagger
 * tags:
 *   name: Órdenes
 *   description: Gestión de órdenes de envío
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear una nueva orden de envío
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrder'
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *       400:
 *         description: Error de validación
 */
router.post(
  "/orders",
  validateSchema(createOrderSchema),
  createOrderController
);

/**
 * @swagger
 * /api/orders/{orderId}/assign:
 *   post:
 *     summary: Asignar transportista y ruta a una orden
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignOrder'
 *     responses:
 *       200:
 *         description: Asignación realizada
 *       404:
 *         description: Orden no encontrada
 */
router.post(
  "/orders/:orderId/assign",
  validateSchema(assignOrderSchema),
  assignOrderController
);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener listado de órdenes
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [En espera, En tránsito, Entregado]
 *         description: Filtrar por estado
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de resultados por página
 *     responses:
 *       200:
 *         description: Listado de órdenes
 *       400:
 *         description: Error en los parámetros
 */
router.get("/orders", getOrdersController);

/**
 * @swagger
 * /api/orders/{orderId}/status:
 *   get:
 *     summary: Consultar estado actual de una orden
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Estado de la orden obtenido
 *       404:
 *         description: Orden no encontrada
 */
router.get("/orders/:orderId/status", getOrderStatusController);

/**
 * @swagger
 * /api/orders/{orderId}/status:
 *   put:
 *     summary: Actualizar estado de una orden
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nuevoEstado:
 *                 type: string
 *                 enum: [En espera, En tránsito, Entregado]
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Orden no encontrada
 */
router.put("/orders/:orderId/status", updateOrderStatusController);

/**
 * @swagger
 * /api/orders/{id}/history:
 *   get:
 *     summary: Consultar historial de estados de una orden
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Historial de la orden obtenido
 *       404:
 *         description: Orden no encontrada
 */
router.get("/orders/:id/history", getOrderHistoryController);
