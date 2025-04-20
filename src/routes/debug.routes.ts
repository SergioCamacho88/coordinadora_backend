import { Router } from "express";
import { redisClient } from "../config/redis";
import { authenticate } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/roleMiddleware";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Debug Redis
 *   description: Endpoints de depuración para consultar datos en Redis
 */

/**
 * @swagger
 * /api/debug/redis/{key}:
 *   get:
 *     summary: Obtener el valor de una clave específica en Redis
 *     tags: [Debug Redis]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la clave en Redis
 *     responses:
 *       200:
 *         description: Valor de la clave obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 key:
 *                   type: string
 *                 value:
 *                   type: string
 *       404:
 *         description: Clave no encontrada
 *       500:
 *         description: Error interno del servidor
 */
// Obtener valor de una clave Redis
router.get("/debug/redis/:key", authenticate, isAdmin, async (req, res) => {
  const key = req.params.key;
  try {
    const value = await redisClient.get(key);
    res.json({ key, value });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/debug/redis:
 *   get:
 *     summary: Obtener todas las claves de Redis
 *     tags: [Debug Redis]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de claves obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 keys:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Error interno del servidor
 */
// Ver todas las claves Redis (útil en desarrollo)
router.get("/debug/redis", authenticate, isAdmin, async (req, res) => {
  try {
    const keys = await redisClient.keys("*");
    res.json({ keys });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
