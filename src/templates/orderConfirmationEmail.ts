export const buildOrderConfirmationEmail = (orderInfo: {
  weight: number;
  dimensions: string;
  product_type: string;
  destination_address: string;
}) => {
  return `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #2b4eff;">📦 Tu orden fue registrada exitosamente</h2>
        <p style="font-size: 16px; margin-top: 20px;">Gracias por confiar en Coordinadora. Aquí tienes el resumen de tu envío:</p>
  
        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
          <tr>
            <td style="font-weight: bold; padding: 8px;">Peso:</td>
            <td style="padding: 8px;">${orderInfo.weight} kg</td>
          </tr>
          <tr style="background-color: #f0f0f0;">
            <td style="font-weight: bold; padding: 8px;">Dimensiones:</td>
            <td style="padding: 8px;">${orderInfo.dimensions}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px;">Tipo de producto:</td>
            <td style="padding: 8px;">${orderInfo.product_type}</td>
          </tr>
          <tr style="background-color: #f0f0f0;">
            <td style="font-weight: bold; padding: 8px;">Destino:</td>
            <td style="padding: 8px;">${orderInfo.destination_address}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px;">Estado inicial:</td>
            <td style="padding: 8px; color: #007b00;"><strong>En espera</strong></td>
          </tr>
        </table>
  
        <p style="margin-top: 24px; font-size: 14px; color: #777;">Si tienes alguna duda o deseas rastrear tu envío, entra a nuestra plataforma.</p>
        <a href="https://coordinadora.com" style="display: inline-block; margin-top: 16px; padding: 10px 20px; background-color: #2b4eff; color: white; text-decoration: none; border-radius: 4px;">
          Ir a Coordinadora
        </a>
      </div>
    `;
};
