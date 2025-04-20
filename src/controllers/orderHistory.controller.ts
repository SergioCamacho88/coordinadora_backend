import { Request, Response } from "express";
import { getUserOrderHistoryUseCase } from "../usecases/orderHistory.usecase";

export const getUserOrderHistoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Usuario no autenticado." });
      return;
    }

    const orders = await getUserOrderHistoryUseCase(userId);
    res.json(orders);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener historial de órdenes." });
  }
};
