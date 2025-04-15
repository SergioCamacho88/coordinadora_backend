import express from 'express'
import dotenv from 'dotenv'
import { db } from './config/mysql'
import { redisClient } from './config/redis'
import authRoutes from './routes/auth.routes'
import protectedRoutes from './routes/protected.routes'
import orderRoutes from './routes/order.routes'
import rutaRoutes from './routes/ruta.routes'
import transportistaRoutes from './routes/transportista.routes'


dotenv.config()

const app = express()
app.use(express.json())
app.get('/', (req, res) => {
  res.send('API funcionando 🚀')
})
app.use('/api', protectedRoutes)
app.use('/api', orderRoutes)
app.use('/api/auth', authRoutes)
app.use('/api', rutaRoutes)
app.use('/api', transportistaRoutes)

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await redisClient.connect()
    await db.getConnection()
    console.log('✅ MySQL conectado')

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
    })
  } catch (err) {
    console.error('❌ Error al iniciar el servidor:', err)
    process.exit(1)
  }
}

start()
