import fp from "fastify-plugin";
import { Role } from "@repo/schemas";
import { FastifyRequest } from "fastify";
import { UnauthorizedError } from "@error/unauthorized.error";
import { ForbiddenError } from "@error/forbidden.error";

export interface ICurrentUser {
  id: number;
  role: Role;
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;

    authorize: (
      ...roles: Role[]
    ) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    currentUser?: ICurrentUser;
  }
}

async function verify(request: FastifyRequest): Promise<ICurrentUser> {
  try {
    await request.jwtVerify();
  } catch {
    throw new UnauthorizedError("Authorization required");
  }

  const payload = request.user as { id: number; role: Role };
  const current: ICurrentUser = { id: payload.id, role: payload.role };
  request.currentUser = current;
  return current;
}

export default fp(
  async function authPlugin(fastify) {
    fastify.decorate(
      "authenticate",
      async function (request: FastifyRequest): Promise<void> {
        await verify(request);
      },
    );

    fastify.decorate("authorize", function (...roles: Role[]) {
      return async function (request: FastifyRequest): Promise<void> {
        const user = await verify(request);
        if (user.role === "ADMIN") return;
        if (!roles.includes(user.role)) {
          throw new ForbiddenError("Insufficient permissions");
        }
      };
    });
  },
  {
    name: "auth-plugin",
  },
);
