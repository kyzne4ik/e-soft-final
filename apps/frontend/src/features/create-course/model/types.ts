import { z } from "zod";

export const createCourseSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  description: z.string(),
});

export type CreateCourseFormData = z.infer<typeof createCourseSchema>;
