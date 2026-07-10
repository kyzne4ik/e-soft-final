import z from "zod";

export const upsertSubmissionSchema = z.object({
  repoLink: z.string().min(1, "Укажите ссылку на репозиторий"),
});

export type UpsertSubmissionFormData = z.infer<typeof upsertSubmissionSchema>;
