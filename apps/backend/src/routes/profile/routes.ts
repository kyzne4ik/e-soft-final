import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { UserRepository } from "@modules/user/user.repository";
import { ProfileService } from "@modules/profile/profile.service";
import { ProfileController } from "@modules/profile/profile.controller";
import { UserTelegramRepository } from "@modules/profile/user-telegram/user-telegram.repository";
import { UserTelegramStore } from "@modules/profile/user-telegram/user-telegram.store";

export default async function profileRoutes(fastify: FastifyInstance) {
  const controller = new ProfileController(
    new ProfileService(
      new UserTelegramStore(fastify.redis),
      new UserTelegramRepository(db),
      new UserRepository(db),
    ),
  );

  fastify.get(
    "/telegram",
    { schema: { tags: ["Profile"], summary: "Посмотреть профиль" } },
    controller.getTelegram,
  );

  fastify.patch(
    "/",
    { schema: { tags: ["Profile"], summary: "Редактировать свой профиль" } },
    controller.updateProfile,
  );

  fastify.patch(
    "/password",
    { schema: { tags: ["Profile"], summary: "Сменить пароль" } },
    controller.changePassword,
  );

  fastify.post(
    "/telegram",
    { schema: { tags: ["Profile"], summary: "Привязать Telegram к профилю" } },
    controller.bindTelegram,
  );

  fastify.delete(
    "/telegram",
    { schema: { tags: ["Profile"], summary: "Отвязать Telegram от профиля" } },
    controller.unbindTelegram,
  );

  fastify.post(
    "/telegram/link",
    {
      schema: {
        tags: ["Profile"],
        summary: "Сгенерировать ссылку-привязки Telegram",
      },
    },
    controller.generateLink,
  );
}
