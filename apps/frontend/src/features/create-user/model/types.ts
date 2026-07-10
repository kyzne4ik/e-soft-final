import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string().min(1, "Имя обязательно"),
  lastName: z.string().min(1, "Фамилия обязательна"),
  patronymic: z.string(),
  email: z.string().min(1, "Email обязателен").email("Некорректный email"),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
  role: z.string().min(1, "Выберите роль"),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
