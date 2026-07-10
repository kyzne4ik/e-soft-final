import { z } from "zod";

export const submitSolutionSchema = z.object({
  repoLink: z.string().min(1, "Ссылка на репозиторий обязательна"),
});

export type SubmitSolutionFormData = z.infer<typeof submitSolutionSchema>;
