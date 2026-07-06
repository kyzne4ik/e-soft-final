import {
  idParamSchema,
  taskQuerySchema,
  createTaskPayloadSchema,
  updateTaskPayloadSchema,
} from "@repo/schemas";
import { ResponseToolKit } from "@utils";
import { TaskService } from "./task.service";
import { ITaskController } from "./task.types";
import { FastifyRequest, FastifyReply } from "fastify";

export class TaskController implements ITaskController {
  constructor(private taskService: TaskService) {}

  getAll = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const query = taskQuerySchema.parse(req.query);
    const result = await this.taskService.getTasks(query);

    return rep.send(ResponseToolKit.paginated(result));
  };

  getById = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const result = await this.taskService.getTask(id);

    return rep.send(ResponseToolKit.success(result));
  };

  create = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const body = createTaskPayloadSchema.parse(req.body);
    const result = await this.taskService.createTask(body);

    return rep
      .status(201)
      .send(ResponseToolKit.success(result, "Задача создана", 201));
  };

  update = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const body = updateTaskPayloadSchema.parse(req.body);
    const result = await this.taskService.updateTask(id, body);

    return rep.send(ResponseToolKit.success(result, "Задача обновлена"));
  };

  delete = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    await this.taskService.deleteTask(id);

    return rep.send(ResponseToolKit.success(null, "Задача удалена"));
  };
}
