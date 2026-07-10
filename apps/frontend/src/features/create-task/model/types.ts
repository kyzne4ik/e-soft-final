import { z } from "zod";

export const createTaskSchema = z.object({
  streamId: z.string().min(1, "Выберите поток"),
  title: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  repoTemplate: z.string().min(1, "Ссылка на репозиторий обязательна"),
  deadline: z.string().min(1, "Укажите дедлайн"),
});

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
