export const buildOrderAssignedEmail = (order: any, ruta: any, transportista: any) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #2b4eff;">🚚 Tu envío ha sido asignado</h2>
        <p>La orden #${order.id} ha sido asignada correctamente a un transportista.</p>
  
        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
          <tr>
            <td style="font-weight: bold; padding: 8px;">Ruta:</td>
            <td style="padding: 8px;">${ruta.name}</td>
          </tr>
          <tr style="background-color: #f0f0f0;">
            <td style="font-weight: bold; padding: 8px;">Transportista:</td>
            <td style="padding: 8px;">${transportista.name}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px;">Estado actual:</td>
            <td style="padding: 8px; color: #007b00;"><strong>En tránsito</strong></td>
          </tr>
        </table>
  
        <p style="margin-top: 24px; font-size: 14px; color: #777;">Gracias por usar Coordinadora.</p>
      </div>
    `
  }
  