import { createClient } from "redis";

let redisClient = null;

export const connectRedis = async () => {
  if (!process.env.REDIS_URL) {
    console.log("⚠️ Redis disabled (no REDIS_URL provided)");
    return;
  }

  try {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });

    redisClient.on("error", (err) => {
      console.error("Redis error:", err.message);
    });

    await redisClient.connect();
    console.log("⚡ Redis Connected");
  } catch (err) {
    console.log("⚠️ Redis connection skipped");
  }
};

export { redisClient };