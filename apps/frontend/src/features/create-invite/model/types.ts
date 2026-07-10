import { z } from "zod";

export const createInviteSchema = z.object({
  firstName: z.string().min(1, "Имя обязательно"),
  lastName: z.string().min(1, "Фамилия обязательна"),
  patronymic: z.string(),
  email: z.string().min(1, "Email обязателен").email("Некорректный email"),
  role: z.string().min(1, "Выберите роль"),
  ttlSeconds: z.string().min(1, "Выберите срок действия"),
});

export type CreateInviteFormData = z.infer<typeof createInviteSchema>;
