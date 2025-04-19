// src/use-cases/orderHistory.usecase.ts

import { getUserOrderHistoryRepository } from "../repositories/orderHistory.repository.ts";

export const getUserOrderHistoryUseCase = async (userId: number) => {
  const orders = await getUserOrderHistoryRepository(userId);
  return orders;
};
