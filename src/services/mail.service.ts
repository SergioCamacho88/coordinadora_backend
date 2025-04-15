import { Resend } from 'resend'
import { buildOrderConfirmationEmail } from '../templates/orderConfirmationEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendConfirmationEmail = async (to: string, orderInfo: any) => {
  try {
    const html = buildOrderConfirmationEmail(orderInfo)

    const { data, error } = await resend.emails.send({
      from: 'Coordinadora <no-responder-coordinadora@phdigital.app>',
      to,
      subject: 'Confirmación de tu orden de envío',
      html
    })

    if (error) {
      console.error('❌ Error al enviar correo con Resend:', error)
    } else {
      console.log('✅ Correo enviado con Resend, ID:', data?.id)
    }
  } catch (err) {
    console.error('❌ Error inesperado en Resend:', err)
  }
}
