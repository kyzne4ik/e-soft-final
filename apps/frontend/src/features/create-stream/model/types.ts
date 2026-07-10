import { z } from "zod";

export const createStreamSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  courseId: z.string().min(1, "Выберите курс"),
});

export type CreateStreamFormData = z.infer<typeof createStreamSchema>;
