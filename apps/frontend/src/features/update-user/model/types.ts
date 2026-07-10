import { z } from "zod";

export const updateUserSchema = z.object({
  firstName: z.string().min(1, "Имя обязательно"),
  lastName: z.string().min(1, "Фамилия обязательна"),
  patronymic: z.string(),
  email: z.string().min(1, "Email обязателен").email("Некорректный email"),
  role: z.string().min(1, "Выберите роль"),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
