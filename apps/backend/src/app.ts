import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fastifyJwt } from "@fastify/jwt";
import { fastifyRedis } from "@fastify/redis";
import { fastifyAutoload } from "@fastify/autoload";
import { AppConfig, RedisConfig } from "@config";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { logger } from "@utils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createAppInstance = () => {
  const app = fastify({
    loggerInstance: logger,
  }).withTypeProvider<ZodTypeProvider>();

  app.register(fastifyJwt, {
    secret: AppConfig.BACKEND_JWT_SECRET,
  });

  app.register(fastifyRedis, {
    host: RedisConfig.REDIS_HOST,
    port: RedisConfig.REDIS_PORT,
    password: RedisConfig.REDIS_PASSWORD,
    db: RedisConfig.REDIS_DB,
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifyAutoload, {
    dir: join(__dirname, "./libs/plugins/app"),
    cascadeHooks: true,
    autoHooks: true,
  });

  app.register(fastifyAutoload, {
    dir: join(__dirname, "./libs/plugins/externals"),
    cascadeHooks: true,
    autoHooks: true,
  });

  app.register(fastifyAutoload, {
    dir: join(__dirname, "./routes"),
    cascadeHooks: true,
    autoHooks: true,
    autoHooksPattern: /^[_.]?(auto_?)?hooks(?:\.ts|\.js)$/iu,
    options: {
      prefix: "/api",
    },
  });

  return app;
};
