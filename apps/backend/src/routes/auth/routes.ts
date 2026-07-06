import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { AuthService } from "@modules/auth/auth.service";
import { AuthController } from "@modules/auth/auth.controller";
import { UserRepository } from "@modules/user/user.repository";
import { InviteService } from "@modules/auth/invite/invite.service";
import { InviteTokenStore } from "@modules/auth/invite/invite-token.store";
import { AuthTokenStore } from "@modules/auth/auth-token/auth-token.store";
import { AuthTokenService } from "@modules/auth/auth-token/auth-token.service";

export default async function authRoutes(fastify: FastifyInstance) {
  const controller = new AuthController(
    new AuthService(
      new UserRepository(db),
      new AuthTokenService(new AuthTokenStore(fastify.redis), fastify.jwt),
      new InviteService(new InviteTokenStore(fastify.redis)),
    ),
  );

  fastify.post(
    "/login",
    { schema: { tags: ["Auth"], summary: "Вход по email и паролю" } },
    controller.login,
  );

  fastify.post(
    "/invite",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: { tags: ["Auth"], summary: "Создать учётку и отправить инвайт" },
    },
    controller.invite,
  );

  fastify.post(
    "/activate",
    {
      schema: {
        tags: ["Auth"],
        summary: "Активировать аккаунт по инвайт-токену",
      },
    },
    controller.activate,
  );

  fastify.post(
    "/refresh",
    {
      schema: {
        tags: ["Auth"],
        summary: "Обновить пару токенов по refresh-токену",
      },
    },
    controller.refresh,
  );

  fastify.post(
    "/logout",
    {
      schema: { tags: ["Auth"], summary: "Выход (отзыв refresh-токена)" },
    },
    controller.logout,
  );

  fastify.get(
    "/me",
    {
      preHandler: fastify.authenticate,
      schema: { tags: ["Auth"], summary: "Текущий пользователь" },
    },
    controller.me,
  );
}
