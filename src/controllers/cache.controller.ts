import { Request, Response } from "express";
import { redisClient } from "../config/redis";

export const clearEnviosCacheController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const keys = await redisClient.keys("cache:reporte:envios*");
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`🧹 Cache limpiado: ${keys.length} claves eliminadas`);
    }

    res.status(200).json({
      message: "Cache de reportes eliminado correctamente",
      count: keys.length,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
