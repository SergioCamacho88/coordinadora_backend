import { Request, Response } from "express";
import { createOrderUseCase } from "./usecases/createOrder";
import { assignOrderUseCase } from "./usecases/assignOrderUseCase";
import { getOrdersUseCase } from "./usecases/getOrdersUseCase";
import {
  getOrderStatus,
  updateOrderStatus,
} from "../../services/status.service";
import { db } from "../../config/mysql";
import jwt from "jsonwebtoken";

export const createOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Obtener el token del header de autorización
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "No autorizado" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as { id: number };

    const orderData = {
      ...req.body,
      user_id: decoded.id,
    };

    const orderId = await createOrderUseCase(orderData);
    res.status(201).json({ orderId, message: "Orden creada correctamente" });
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Token inválido" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const assignOrderController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const assignData = {
      ...req.body,
      orderId: Number(orderId),
    };

    await assignOrderUseCase(assignData);
    res.status(200).json({ message: "Orden asignada exitosamente" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getOrdersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.query;
    const orders = await getOrdersUseCase(status as string);
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getOrderStatusController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const status = await getOrderStatus(Number(orderId));
    res.status(200).json({ status });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateOrderStatusController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    await updateOrderStatus(Number(orderId), status);
    res.status(200).json({ message: "Estado actualizado exitosamente" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getOrderHistoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderId = Number(req.params.id);
    if (isNaN(orderId)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const [rows]: any = await db.query(
      `SELECT status, changed_at FROM order_status_history WHERE order_id = ? ORDER BY changed_at ASC`,
      [orderId]
    );

    res.status(200).json({ history: rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
