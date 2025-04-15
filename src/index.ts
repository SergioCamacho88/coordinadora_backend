import express from 'express'
import dotenv from 'dotenv'
import { db } from './config/mysql'
import { redisClient } from './config/redis'

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API funcionando 🚀')
})

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
