import { Router } from "express";
import { getEnviosReportController } from "../controllers/report.controller";
import { authenticate } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/roleMiddleware";
import { getEnviosMetricsController } from "../controllers/metricas.controller";
import { clearEnviosCacheController } from "../controllers/cache.controller";

const router = Router();

/**
 * @swagger
 * /api/reportes/envios:
 *   get:
 *     summary: Obtener reporte detallado de envíos
 *     tags: [Reportes de Envíos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fechaInicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha inicial (YYYY-MM-DD)
 *       - in: query
 *         name: fechaFin
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha final (YYYY-MM-DD)
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [En espera, En tránsito, Entregado]
 *         description: Estado del envío para filtrar
 *       - in: query
 *         name: transportistaId
 *         schema:
 *           type: integer
 *         description: ID del transportista
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Página de resultados
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de resultados por página
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 *       400:
 *         description: Error en los parámetros enviados
 */
router.get(
  "/reportes/envios",
  authenticate,
  isAdmin,
  getEnviosReportController
);
/**
 * @swagger
 * /api/reportes/envios/metricas:
 *   get:
 *     summary: Obtener métricas globales de desempeño de envíos
 *     tags: [Reportes de Envíos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Métricas calculadas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tiempoPromedioEntregaHoras:
 *                   type: number
 *                   example: 24.5
 *                 totalEnvíos:
 *                   type: integer
 *                   example: 120
 *                 entregados:
 *                   type: integer
 *                   example: 110
 *                 enTransito:
 *                   type: integer
 *                   example: 10
 */
router.get(
  "/reportes/envios/metricas",
  authenticate,
  isAdmin,
  getEnviosMetricsController
);
/**
 * @swagger
 * /api/reportes/envios/cache:
 *   delete:
 *     summary: Borrar la caché de reportes de envíos
 *     tags: [Reportes de Envíos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Caché de reportes eliminada exitosamente
 *       500:
 *         description: Error interno al eliminar la caché
 */
router.delete(
  "/reportes/envios/cache",
  authenticate,
  isAdmin,
  clearEnviosCacheController
);
export default router;
