import { Router } from "express";
import { getEnviosReportController } from "../controllers/report.controller";
import { authenticate } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/roleMiddleware";
import { getEnviosMetricsController } from "../controllers/metricas.controller";
import { clearEnviosCacheController } from "../controllers/cache.controller";

const router = Router();

router.get(
  "/reportes/envios",
  authenticate,
  isAdmin,
  getEnviosReportController
);
router.get(
  "/reportes/envios/metricas",
  authenticate,
  isAdmin,
  getEnviosMetricsController
);
router.delete(
  "/reportes/envios/cache",
  authenticate,
  isAdmin,
  clearEnviosCacheController
);
export default router;
