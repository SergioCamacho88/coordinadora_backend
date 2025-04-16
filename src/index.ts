import express from 'express'
import dotenv from 'dotenv'
import { db } from './config/mysql'
import { redisClient } from './config/redis'
import authRoutes from './routes/auth.routes'
import orderRoutes from './routes/order.routes'
import rutaRoutes from './routes/ruta.routes'
import transportistaRoutes from './routes/transportista.routes'
import debugRoutes from './routes/debug.routes'
import protectedRoutes from './routes/protected.routes'

import http from 'http'
import { WebSocketServer } from 'ws'

dotenv.config()

const app = express()
app.use(express.json())

// ✅ Rutas organizadas
app.use('/api/auth', authRoutes)
app.use('/api', orderRoutes)
app.use('/api', rutaRoutes)
app.use('/api', transportistaRoutes)
app.use('/api', debugRoutes)
app.use('/api', protectedRoutes)

// Crear servidor HTTP + WebSocket
const server = http.createServer(app)
const wss = new WebSocketServer({ server })

// WebSocket: manejar conexiones
wss.on('connection', (ws) => {
  console.log('📡 Cliente WebSocket conectado')
  ws.send(JSON.stringify({ type: 'connection', message: 'Conexión WebSocket establecida' }))
})

// WebSocket: función para emitir a todos los clientes
export const notifyClients = (message: any) => {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(message))
    }
  })
}

// Iniciar servidor y servicios
const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await redisClient.connect()    
    await db.getConnection()
    console.log('✅ MySQL conectado')

    server.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
    })
  } catch (err) {
    console.error('❌ Error al iniciar:', err) 
    process.exit(1)
  }
}

start()