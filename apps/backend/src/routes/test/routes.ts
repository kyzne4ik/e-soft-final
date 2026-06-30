import { telegramService } from "@telegram";
import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.get(
    "/",
    { schema: { tags: ["Test"], summary: "Тестовая ручка" } },
    async () => {
      await telegramService.sendToUser(908278996, "some-test-text");
    },
  );
}
