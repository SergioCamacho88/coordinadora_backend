import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/roleMiddleware";
import { getTransportistasController } from "../controllers/transportista.controller";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Transportistas
 *   description: Gestión de transportistas
 */

/**
 * @swagger
 * /api/transportistas:
 *   get:
 *     summary: Obtener listado de transportistas disponibles
 *     tags: [Transportistas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de transportistas obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: "Juan Pérez"
 *                   disponibilidad:
 *                     type: boolean
 *                     example: true
 *       403:
 *         description: Acceso denegado - solo administradores
 *       401:
 *         description: No autorizado - falta o token inválido
 */

router.get(
  "/transportistas",
  authenticate,
  isAdmin,
  getTransportistasController
);

export default router;
