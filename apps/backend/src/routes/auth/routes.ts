import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { AuthService } from "@modules/auth/auth.service";
import { LeadRepository } from "@modules/crm/lead.repository";
import { AuthController } from "@modules/auth/auth.controller";
import { StreamGuard } from "@modules/lms/stream/stream.guard";
import { UserRepository } from "@modules/user/user.repository";
import { StreamService } from "@modules/lms/stream/stream.service";
import { InviteService } from "@modules/auth/invite/invite.service";
import { StreamRepository } from "@modules/lms/stream/stream.repository";
import { InviteTokenStore } from "@modules/auth/invite/invite-token.store";
import { AuthTokenService } from "@modules/auth/auth-token/auth-token.service";
import { StreamStudentService } from "@modules/lms/stream/stream-student/stream-student.service";
import { StreamStudentRepository } from "@modules/lms/stream/stream-student/stream-student.repository";

export default async function authRoutes(fastify: FastifyInstance) {
  const controller = new AuthController(
    new AuthService(
      new UserRepository(db),
      new AuthTokenService(fastify.jwt),
      new InviteService(new InviteTokenStore(fastify.redis)),
      new StreamStudentService(
        new StreamStudentRepository(db),
        new StreamGuard(db),
      ),
      new StreamService(new StreamRepository(db)),
      new LeadRepository(db),
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
      schema: { tags: ["Auth"], summary: "Отправить инвайт (менеджер)" },
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
    "/confirm-enrollment",
    {
      schema: {
        tags: ["Auth"],
        summary: "Подтвердить зачисление в поток (existing user)",
      },
    },
    controller.confirmEnrollment,
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

  fastify.get(
    "/me",
    {
      preHandler: fastify.authenticate,
      schema: { tags: ["Auth"], summary: "Текущий пользователь" },
    },
    controller.me,
  );
}
