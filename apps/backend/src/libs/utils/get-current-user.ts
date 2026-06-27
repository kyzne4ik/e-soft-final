import { UnauthorizedError } from "@error/unauthorized.error";
import { FastifyRequest } from "fastify";

export const getCurrentUser = (req: FastifyRequest) => {
  const user = req.currentUser;
  if (!user) throw new UnauthorizedError("Требуется авторизация");

  return { user };
};
