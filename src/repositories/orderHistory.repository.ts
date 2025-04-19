// src/repositories/orderHistory.repository.ts

import { db } from "../config/mysql"; // Ajusta la ruta si es diferente

export const getUserOrderHistoryRepository = async (userId: number) => {
  const [rows]: any = await db.query(
    `
    SELECT 
     *
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
};
