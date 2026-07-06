import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { UserService } from "@modules/user/user.service";
import { UserController } from "@modules/user/user.controller";
import { UserRepository } from "@modules/user/user.repository";

export default async function usersRoutes(fastify: FastifyInstance) {
  const controller = new UserController(
    new UserService(new UserRepository(db)),
  );

  fastify.get(
    "/",
    { schema: { tags: ["Users"], summary: "Список пользователей" } },
    controller.getAll,
  );

  fastify.get(
    "/:id",
    { schema: { tags: ["Users"], summary: "Пользователь по id" } },
    controller.getById,
  );

  fastify.post(
    "/",
    { schema: { tags: ["Users"], summary: "Создать пользователя" } },
    controller.create,
  );

  fastify.patch(
    "/:id",
    { schema: { tags: ["Users"], summary: "Обновить пользователя" } },
    controller.update,
  );

  fastify.delete(
    "/:id",
    { schema: { tags: ["Users"], summary: "Удалить пользователя" } },
    controller.delete,
  );
}
