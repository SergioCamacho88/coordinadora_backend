import { Resend } from 'resend'
import { buildOrderConfirmationEmail } from '../templates/orderConfirmationEmail'
import { buildOrderAssignedEmail } from '../templates/orderAssignedEmail'
import { buildOrderStatusUpdatedEmail } from '../templates/orderStatusUpdatedEmail'

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

export const sendAssignmentEmail = async (
  to: string,
  order: any,
  ruta: any,
  transportista: any
) => {
  try {
    const html = buildOrderAssignedEmail(order, ruta, transportista)

    const { data, error } = await resend.emails.send({
      from: 'Coordinadora <no-responder-coordinadora@phdigital.app>',
      to,
      subject: 'Tu envío fue asignado',
      html
    })

    if (error) {
      console.error('❌ Error al enviar correo de asignación:', error)
    } else {
      console.log('✅ Correo de asignación enviado:', data?.id)
    }
  } catch (err) {
    console.error('❌ Error inesperado en envío de asignación:', err)
  }
}
export const sendStatusUpdateEmail = async (to: string, orderId: number, status: string) => {
  try {
    const html = buildOrderStatusUpdatedEmail(orderId, status)

    const { data, error } = await resend.emails.send({
      from: 'Coordinadora <no-responder-coordinadora@phdigital.app>',
      to,
      subject: `Actualización de tu envío #${orderId}`,
      html
    })

    if (error) {
      console.error('❌ Error al enviar correo de cambio de estado:', error)
    } else {
      console.log('✅ Correo de estado enviado:', data?.id)
    }
  } catch (err) {
    console.error('❌ Error inesperado en envío de estado:', err)
  }
}