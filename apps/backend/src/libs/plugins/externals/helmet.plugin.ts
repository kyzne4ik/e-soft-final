import { fastifyHelmet } from "@fastify/helmet";
import fp from "fastify-plugin";

export default fp(
  async function (fastify) {
    await fastify.register(fastifyHelmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
          fontSrc: ["'self'", "data:"],
          connectSrc: ["'self'"],
          frameSrc: ["'none'"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          frameAncestors: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      hidePoweredBy: true,
      noSniff: true,
      xssFilter: true,
      hsts: true,
      referrerPolicy: { policy: "no-referrer" },
    });

    fastify.log.info({
      msg: "Helmet enabled",
    });
  },
  {
    name: "helmet-plugin",
  },
);
