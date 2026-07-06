import { eq } from "drizzle-orm";
import { StreamStatus } from "@repo/schemas";
import { IStreamGuard } from "./stream.types";
import { NotFoundError, ForbiddenError } from "@error";
import { DatabaseType, streams, submission, tasks } from "@repo/database";

export class StreamGuard implements IStreamGuard {
  constructor(private db: DatabaseType) {}

  private async getStatus(streamId: number): Promise<StreamStatus> {
    const [stream] = await this.db
      .select({ status: streams.status })
      .from(streams)
      .where(eq(streams.id, streamId));

    if (!stream) throw new NotFoundError("Поток не найден");

    return stream.status;
  }

  async assertMutable(streamId: number): Promise<void> {
    const status = await this.getStatus(streamId);

    if (status === "FINISHED")
      throw new ForbiddenError("Поток завершён: изменения недоступны");
  }

  async assertActive(streamId: number): Promise<void> {
    const status = await this.getStatus(streamId);

    if (status !== "IN_PROGRESS")
      throw new ForbiddenError(
        status === "FINISHED"
          ? "Поток завершён: сдача и проверка работ недоступны"
          : "Поток ещё не запущен",
      );
  }

  async streamIdByTask(taskId: number): Promise<number> {
    const [task] = await this.db
      .select({ streamId: tasks.streamId })
      .from(tasks)
      .where(eq(tasks.id, taskId));

    if (!task) throw new NotFoundError("Задание не найдено");

    return task.streamId;
  }

  async streamIdBySubmission(submissionId: number): Promise<number> {
    const [row] = await this.db
      .select({ streamId: tasks.streamId })
      .from(submission)
      .innerJoin(tasks, eq(tasks.id, submission.taskId))
      .where(eq(submission.id, submissionId));

    if (!row) throw new NotFoundError("Сдача не найдена");

    return row.streamId;
  }
}
