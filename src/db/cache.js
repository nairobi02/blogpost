import { config } from "../../config.js";
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";
// Initialize client.
export const setupRedis = async () => {
  try {
    // Initialize store.
    const { REDIS_HOST, REDIS_PORT, SESSION_SECRET } = config;
    const URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;
    let redisClient = createClient({ url: URL });
    await redisClient.connect().catch(console.error);
    console.log("Redis client connected");
    return session({
      store: new RedisStore({ client: redisClient }),
      secret: SESSION_SECRET,
      saveUninitialized: true, // recommended: only save session when data exists
      resave: true, // required: force lightweight session keep alive (touch)
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 120, // 60 seconds
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};
