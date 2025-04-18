import { assignOrder } from "../../../repositories/orderAssignment.repository";
import { db } from "../../../config/mysql";
import { findUserById } from "../../../repositories/user.repository";
import { sendAssignmentEmail } from "../../../services/mail.service";
import { notifyClients } from "../../../index";

export const assignOrderUseCase = async (data: {
  orderId: number;
  rutaId: number;
  transportistaId: number;
}) => {
  try {
    // 1. Verificar que la orden existe y está en estado "En espera"
    const [orders]: any = await db.query(
      `SELECT * FROM orders WHERE id = ? AND status = 'En espera'`,
      [data.orderId]
    );
    if (orders.length === 0) {
      throw new Error('La orden no existe o no está en estado "En espera".');
    }
    const order = orders[0];

    // 2. Verificar que la ruta existe
    const [rutas]: any = await db.query(`SELECT * FROM rutas WHERE id = ?`, [
      data.rutaId,
    ]);
    if (rutas.length === 0) {
      throw new Error("La ruta no existe.");
    }

    // 3. Verificar que el transportista existe
    const [transportistas]: any = await db.query(
      `SELECT * FROM transportistas WHERE id = ?`,
      [data.transportistaId]
    );
    if (transportistas.length === 0) {
      throw new Error("El transportista no existe.");
    }

    const transportista = transportistas[0];

    // 4. Verificar capacidad del transportista
    if (order.weight > transportista.capacity) {
      throw new Error(
        `El peso del envío (${order.weight}kg) excede la capacidad del transportista (${transportista.capacity}kg).`
      );
    }

    // 5. Asignar la orden
    await assignOrder(data.orderId, data.rutaId, data.transportistaId);

    // 6. Actualizar el estado de la orden
    await db.query(
      `INSERT INTO order_status_history (order_id, status) VALUES (?, ?)`,
      [data.orderId, "En tránsito"]
    );

    await db.query(`UPDATE orders SET status = ? WHERE id = ?`, [
      "En tránsito",
      data.orderId,
    ]);

    await notifyClients({
      type: "status_update",
      orderId: data.orderId,
      newStatus: "En tránsito",
      updatedAt: new Date().toISOString(),
    });

    // 7. Enviar email de asignación
    const user = await findUserById(order.user_id);
    if (user?.email) {
      await sendAssignmentEmail(user.email, order, rutas[0], transportista);
    }

    return {
      orderId: data.orderId,
      status: "En tránsito",
      assignedTo: {
        transportistaId: data.transportistaId,
        rutaId: data.rutaId,
      },
    };
  } catch (error) {
    throw error;
  }
};
