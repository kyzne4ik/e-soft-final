import { z } from "zod";

export const addStudentSchema = z.object({
  studentId: z.string().min(1, "Выберите студента"),
  mentorId: z.string().min(1, "Выберите ментора"),
});

export type AddStudentFormData = z.infer<typeof addStudentSchema>;
