import { Request, Response } from "express";
import { db } from "../../config/mysql";

export const getEnabledTransportistas = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, capacity FROM transportistas WHERE is_available = true"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error obteniendo transportistas habilitados:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
