export const config = {
  mongodb_userID: process.env.MONGO_INITDB_ROOT_USERNAME,
  mongodb_password: process.env.MONGO_INITDB_ROOT_PASSWORD,
  mongodb_port: process.env.MONGODB_PORT,
  mongodb_ip: process.env.MONGODB_IP || "mongodb",
  REDIS_HOST: process.env.REDIS_HOST || "redis",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET,
};
