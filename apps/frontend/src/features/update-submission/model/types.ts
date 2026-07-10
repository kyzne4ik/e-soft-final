import { z } from "zod";

export const updateSubmissionSchema = z.object({
  repoLink: z.string().min(1, "Ссылка на репозиторий обязательна"),
});

export type UpdateSubmissionFormData = z.infer<typeof updateSubmissionSchema>;
