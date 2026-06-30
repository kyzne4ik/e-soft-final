import IORedis from "ioredis";
import { RedisConfig } from "@config";

export class Redis {
  private static instance: IORedis | null = null;

  static getInstance(): IORedis {
    if (!Redis.instance) {
      Redis.instance = new IORedis({
        host: RedisConfig.REDIS_HOST,
        port: RedisConfig.REDIS_PORT,
        password: RedisConfig.REDIS_PASSWORD,
        db: RedisConfig.REDIS_DB,
      });
    }
    return Redis.instance;
  }
}
