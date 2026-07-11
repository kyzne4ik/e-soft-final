import { z } from "zod";

export const createInviteSchema = z
  .object({
    firstName: z.string().min(1, "Имя обязательно"),
    lastName: z.string().min(1, "Фамилия обязательна"),
    patronymic: z.string(),
    email: z.string().min(1, "Email обязателен").email("Некорректный email"),
    role: z.string().min(1, "Выберите роль"),
    targetStreamId: z.string(),
    ttlSeconds: z.string().min(1, "Выберите срок действия"),
  })
  .superRefine((data, ctx) => {
    if (data.role === "STUDENT" && !data.targetStreamId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["targetStreamId"],
        message: "Выберите поток",
      });
    }
  });

export type CreateInviteFormData = z.infer<typeof createInviteSchema>;
