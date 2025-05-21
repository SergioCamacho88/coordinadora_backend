import http from "http";
import { WebSocketServer } from "ws";
import { db } from "./config/mysql";
import { redisClient } from "./config/redis";
import app from "./app";

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("📡 Cliente WebSocket conectado");
});

export const notifyClients = (message: any) => {
  console.log("📡 Notificando a los clientes:", message);
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(message));
    }
  });
};

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await redisClient.connect();
    await db.getConnection();
    console.log("✅ Redis conectado");
    console.log("✅ MySQL conectado");

    server.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error al iniciar:", err);
    process.exit(1);
  }
};

if (require.main === module) {
  start();
}
