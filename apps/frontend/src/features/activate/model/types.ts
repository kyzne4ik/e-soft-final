import { z } from "zod";

export const activateSchema = z.object({
  firstName: z.string().min(1, "Имя обязательно"),
  lastName: z.string().min(1, "Фамилия обязательна"),
  patronymic: z.string().nullable().optional(),
  password: z
    .string()
    .min(1, "Пароль обязателен")
    .min(8, "Пароль должен содержать минимум 8 символов"),
});

export type ActivateFormData = z.infer<typeof activateSchema>;
