import { z } from "zod";

export const addMentorSchema = z.object({
  mentorId: z.string().min(1, "Выберите ментора"),
});

export type AddMentorFormData = z.infer<typeof addMentorSchema>;
