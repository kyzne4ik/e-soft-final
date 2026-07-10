import { z } from "zod";

export const updateCourseSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  description: z.string(),
});

export type UpdateCourseFormData = z.infer<typeof updateCourseSchema>;
