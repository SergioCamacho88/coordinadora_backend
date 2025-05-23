import { createOrder } from "../../../repositories/order.repository";
import { validateAddress } from "../../../services/address.service";
import { findUserById } from "../../../repositories/user.repository";
import { sendConfirmationEmail } from "../../../services/mail.service";
import { db } from "../../../config/mysql";
import { notifyClients } from "../../../index";

export const createOrderUseCase = async (data: {
  user_id: number;
  origin?: string;
  destination?: string;
  weight: number;
  dimensions: string;
  description?: string;
  destinationAddress?: string;
  productType?: string;
}) => {
  const destinationToValidate = data.destinationAddress || data.destination;
  if (!destinationToValidate) {
    throw new Error("La dirección de destino es requerida");
  }
  console.log("data");
  console.log(data);
  const isValid = await validateAddress(destinationToValidate);
  if (!isValid) {
    throw new Error("La dirección de destino no es válida.");
  }

  try {
    console.log("// 1. Crear la orden");
    // 1. Crear la orden
    const orderData = {
      userId: data.user_id,
      weight: data.weight,
      dimensions: data.dimensions,
      productType: data.productType || data.description || "",
      destinationAddress: destinationToValidate,
    };

    const orderId = await createOrder(orderData);

    // 2. Guardar el estado inicial en el historial
    await db.query(
      `INSERT INTO order_status_history (order_id, status) VALUES (?, ?)`,
      [orderId, "En espera"]
    );
    await notifyClients({
      type: "status_update",
      orderId,
      newStatus: "En espera",
      updatedAt: new Date().toISOString(),
    });

    await notifyClients({
      type: "new_order",
      order: {
        id: orderId,
        weight: data.weight,
        dimensions: data.dimensions,
        productType: data.productType || data.description || "",
        destination_address: destinationToValidate,
        status: "En espera",
      },
    });

    // 3. Enviar email de confirmación
    const user = await findUserById(data.user_id);
    if (user?.email) {

      await sendConfirmationEmail(user.email, {        
        orderId,
        origin: data.origin || "",
        destination_address: destinationToValidate,
        weight: data.weight,
        dimensions: data.dimensions,
        product_type: data.productType,
      });
    }

    return orderId;
  } catch (error) {
    throw error;
  }
};
