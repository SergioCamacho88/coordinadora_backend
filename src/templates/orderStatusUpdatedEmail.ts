export const buildOrderStatusUpdatedEmail = (orderId: number, status: string) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #2b4eff;">📍 Tu envío cambió de estado</h2>
        <p>La orden <strong>#${orderId}</strong> ahora se encuentra en el estado:</p>
        <p style="font-size: 20px; font-weight: bold; color: #007b00;">${status}</p>
        <p style="margin-top: 24px; font-size: 14px; color: #777;">Puedes hacer seguimiento desde tu cuenta en Coordinadora.</p>
      </div>
    `
  }
  