import fp from "fastify-plugin";
import { Role } from "@repo/schemas";
import { FastifyRequest } from "fastify";
import { UnauthorizedError } from "@error/unauthorized.error";
import { ForbiddenError } from "@error/forbidden.error";

export interface ICurrentUser {
  id: number;
  role: Role;
  profileId: number | null;
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
    throw new UnauthorizedError("Требуется авторизация");
  }

  const payload = request.user as ICurrentUser;

  const current: ICurrentUser = {
    id: payload.id,
    role: payload.role,
    profileId: payload.profileId ?? null,
  };

  request.currentUser = current;

  return current;
}

export default fp(
  async function authPlugin(fastify) {
    fastify.decorate("currentUser", null);

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
          throw new ForbiddenError("Недостаточно прав");
        }
      };
    });
  },
  {
    name: "auth-plugin",
  },
);
