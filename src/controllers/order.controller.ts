import { Request, Response } from "express";
import { createOrderUseCase } from "../usecases/createOrder";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const user = req.user as { id: number };
    const { weight, dimensions, productType, destinationAddress } = req.body;

    const orderId = await createOrderUseCase({
      userId: user.id,
      weight,
      dimensions,
      productType,
      destinationAddress,
    });
    console.log(orderId);
    res.status(201).json({ message: "Orden creada correctamente", orderId });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
