import { FastifyReply, FastifyRequest } from "fastify";
import { IUsersController } from "./user.types";
import { UserService } from "./user.service";
import { ResponseToolKit } from "@utils";
import {
  idParamSchema,
  userQuerySchema,
  createUserPayloadSchema,
  updateUserPayloadSchema,
} from "@repo/schemas";

export class UserController implements IUsersController {
  constructor(private userService: UserService) {}

  getAll = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const query = userQuerySchema.parse(req.query);
    const result = await this.userService.getUsers({
      role: query.role,
      isActivated: query.isActivated,
      page: query.page,
      limit: query.limit,
    });

    return rep.send(ResponseToolKit.paginated(result));
  };

  getById = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const result = await this.userService.getUser(id);

    return rep.send(ResponseToolKit.success(result));
  };

  create = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const body = createUserPayloadSchema.parse(req.body);
    const result = await this.userService.createUserWithProfile(body);

    return rep
      .status(201)
      .send(ResponseToolKit.success(result, "Пользователь создан", 201));
  };

  update = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const body = updateUserPayloadSchema.parse(req.body);
    const result = await this.userService.updateUser(id, body);

    return rep.send(ResponseToolKit.success(result, "Пользователь обновлён"));
  };

  delete = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    await this.userService.deleteUser(id);

    return rep.send(ResponseToolKit.success(null, "Пользователь удалён"));
  };
}
