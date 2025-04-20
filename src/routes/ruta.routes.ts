import { Router } from "express";
import { getRutasController } from "../controllers/ruta.controller";
import { authenticate } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/roleMiddleware";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Rutas
 *   description: Gestión de rutas de entrega
 */

/**
 * @swagger
 * /api/rutas:
 *   get:
 *     summary: Obtener listado de rutas disponibles
 *     tags: [Rutas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de rutas obtenido exitosamente
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
 *                   nombreRuta:
 *                     type: string
 *                     example: "Zona Norte"
 *                   capacidadDisponible:
 *                     type: integer
 *                     example: 50
 *       403:
 *         description: Acceso denegado - solo administradores
 *       401:
 *         description: No autorizado - falta o token inválido
 */

router.get("/rutas", authenticate, isAdmin, getRutasController);

export default router;
