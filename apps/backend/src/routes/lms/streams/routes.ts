import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { StreamController } from "@modules/lms/stream/stream.controller";
import { StreamTelegramService } from "@modules/lms/stream/stream-telegram/stream-telegram.service";
import { StreamTelegramRepository } from "@modules/lms/stream/stream-telegram/stream-telegram.repository";

export default async function streamsRoutes(fastify: FastifyInstance) {
  const controller = new StreamController(
    new StreamTelegramService(new StreamTelegramRepository(db)),
  );

  fastify.get(
    "/:id/telegram",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: {
        tags: ["Streams"],
        summary: "Посмотреть привязанный Telegram потока",
      },
    },
    controller.getTelegram,
  );

  fastify.post(
    "/:id/telegram",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: { tags: ["Streams"], summary: "Привязать Telegram к потоку" },
    },
    controller.bindTelegram,
  );

  fastify.delete(
    "/:id/telegram",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: { tags: ["Streams"], summary: "Отвязать Telegram от потока" },
    },
    controller.unbindTelegram,
  );
}
