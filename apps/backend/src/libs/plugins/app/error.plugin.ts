import { ZodError } from "zod";
import fp from "fastify-plugin";
import { HttpError, pgErrorToHttp } from "@error";
import { FastifyError } from "fastify";
import { ResponseToolKit } from "@utils";

export default fp(async function (fastify) {
  fastify.setErrorHandler((err: FastifyError, request, reply) => {
    if (err instanceof ZodError) {
      const errors = err.issues.map((issue) => ({
        field: issue.path.join(".") || "body",
        message: issue.message,
      }));
      return reply.status(422).send(ResponseToolKit.validationError(errors));
    }

    if (err instanceof HttpError)
      return reply
        .status(err._statusCode)
        .send(ResponseToolKit.error(err.message, err._statusCode));

    const pgError = pgErrorToHttp(err);
    if (pgError)
      return reply
        .status(pgError._statusCode)
        .send(ResponseToolKit.error(pgError.message, pgError._statusCode));

    const statusCode = err.statusCode ?? 500;

    fastify.log.debug(`[error] ${JSON.stringify(err)}`);

    if (statusCode >= 400 && statusCode < 500)
      return reply
        .status(statusCode)
        .send(ResponseToolKit.error(err.message, statusCode));

    request.log.error({ err }, "Unhandled error");
    return reply
      .status(500)
      .send(ResponseToolKit.error("Internal Server Error", 500));
  });
});
