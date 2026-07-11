import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "Имя обязательно"),
  lastName: z.string().min(1, "Фамилия обязательна"),
  patronymic: z.string().optional(),
  email: z.string().email("Некорректный email"),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
