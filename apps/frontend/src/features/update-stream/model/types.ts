import { z } from "zod";

export const updateStreamSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  courseId: z.string().min(1, "Выберите курс"),
});

export type UpdateStreamFormData = z.infer<typeof updateStreamSchema>;
