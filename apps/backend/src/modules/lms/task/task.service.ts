import {
  TaskQuery,
  TaskResponse,
  CreateTaskPayload,
  UpdateTaskPayload,
} from "@repo/schemas";
import { ITaskService } from "./task.types";
import { PaginationResponse } from "@types";
import { isPgError, PG } from "@repo/database";
import { taskMap, tasksMap } from "./task.mapper";
import { TaskRepository } from "./task.repository";
import { StreamGuard } from "../stream/stream.guard";
import { ConflictError, NotFoundError } from "@error";

export class TaskService implements ITaskService {
  constructor(
    private taskRepo: TaskRepository,
    private streamGuard: StreamGuard,
  ) {}

  async getTasks(
    filters?: TaskQuery,
  ): Promise<PaginationResponse<TaskResponse>> {
    const tasks = await this.taskRepo.findAll(filters);

    return {
      ...tasks,
      data: tasksMap(tasks.data),
    };
  }

  async getTask(id: number): Promise<TaskResponse> {
    const task = await this.taskRepo.findById(id);

    if (!task) throw new NotFoundError("Задача не найдена");

    return taskMap(task);
  }

  async createTask(data: CreateTaskPayload): Promise<TaskResponse> {
    await this.streamGuard.assertMutable(data.streamId);

    try {
      const task = await this.taskRepo.create(data);

      return taskMap(task);
    } catch (e) {
      if (isPgError(e, PG.FK))
        throw new ConflictError("Указанный поток не существует");
      throw e;
    }
  }

  async updateTask(id: number, data: UpdateTaskPayload): Promise<TaskResponse> {
    const streamId = await this.streamGuard.streamIdByTask(id);
    await this.streamGuard.assertMutable(streamId);

    const task = await this.taskRepo.update(id, data);

    if (!task) throw new NotFoundError("Задача не найдена");

    return taskMap(task);
  }

  async deleteTask(id: number): Promise<boolean> {
    const streamId = await this.streamGuard.streamIdByTask(id);
    await this.streamGuard.assertMutable(streamId);

    return await this.taskRepo.delete(id);
  }
}
