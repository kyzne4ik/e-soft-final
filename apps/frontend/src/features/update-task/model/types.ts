import { z } from "zod";

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  repoTemplate: z.string().min(1, "Ссылка на репозиторий обязательна"),
  recordLink: z
    .string()
    .url("Введите корректную ссылку")
    .or(z.literal(""))
    .optional(),
  deadline: z.string().min(1, "Укажите дедлайн"),
});

export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;
