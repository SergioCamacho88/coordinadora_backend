import dotenv from "dotenv";

dotenv.config();

let redisClient: any; // Puede ser RedisMock o Redis real

if (process.env.NODE_ENV === "test") {
  console.log("🧪 Usando Redis Mock en ambiente de test");
  const RedisMock = require("ioredis-mock");
  redisClient = new RedisMock();

  // Agregar soporte falso para setEx en mock
  redisClient.setEx = async (key: string, seconds: number, value: string) => {
    await redisClient.set(key, value);
    await redisClient.expire(key, seconds);
  };
} else {
  const { createClient } = require("redis");

  redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  });

  redisClient.on("error", (err: Error) => console.error("❌ Redis error", err));
  redisClient.on("connect", () => console.log("✅ Redis conectado"));
}

export { redisClient };
