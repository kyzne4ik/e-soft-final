import type { TaskDto, TaskResponse } from "@repo/schemas";

export const taskMap = (t: TaskDto): TaskResponse => ({
  id: t.id,
  streamId: t.streamId,
  title: t.title,
  description: t.description,
  repoTemplate: t.repoTemplate,
  deadline: t.deadline,
});

export const tasksMap = (tasks: TaskDto[]): TaskResponse[] =>
  tasks.map(taskMap);
