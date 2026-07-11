import { RedisConfig } from "@config";
import { ConnectionOptions } from "bullmq";

export const bullConnection: ConnectionOptions = {
  host: RedisConfig.REDIS_HOST,
  port: RedisConfig.REDIS_PORT,
  db: RedisConfig.REDIS_DB,
  password: RedisConfig.REDIS_PASSWORD,
};
