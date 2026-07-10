import { z } from "zod";

export const createLeadSchema = z.object({
  firstName: z.string().min(1, "Имя обязательно"),
  lastName: z.string().min(1, "Фамилия обязательна"),
  patronymic: z.string(),
  email: z.string().min(1, "Email обязателен").email("Некорректный email"),
  phone: z.string(),
  telegram: z.string(),
  experience: z.string(),
  testResult: z.union([z.literal(""), z.string().url("Некорректная ссылка")]),
  targetStreamId: z.string().min(1, "Выберите поток"),
});

export type CreateLeadFormData = z.infer<typeof createLeadSchema>;
