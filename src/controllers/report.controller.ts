import { Request, Response } from "express";
import { getEnviosReportUseCase } from "../usecases/getEnviosReportUseCase";
import { redisClient } from "../config/redis";

const generarCacheKey = (base: string, filtros: any): string => {
  const str = base + JSON.stringify(filtros);
  return `cache:${Buffer.from(str).toString("base64")}`;
};

export const getEnviosReportController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      estado,
      transportistaId,
      fechaInicio,
      fechaFin,
      pagina = 1,
      limite = 10,
    } = req.query;

    const filters = {
      estado: estado as string,
      transportistaId: transportistaId ? Number(transportistaId) : undefined,
      fechaInicio: fechaInicio as string,
      fechaFin: fechaFin as string,
      limite: Number(limite),
      offset: (Number(pagina) - 1) * Number(limite),
    };

    const cacheKey = generarCacheKey("reporte:envios", filters);

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log(`✅ Cache HIT: ${cacheKey}`);
      res.status(200).json(JSON.parse(cached));
      return;
    }

    const result = await getEnviosReportUseCase(filters);

    await redisClient.setEx(cacheKey, 600, JSON.stringify(result));
    console.log(`📦 Cache SET: ${cacheKey}`);

    res.status(200).json(result);
    return;
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
