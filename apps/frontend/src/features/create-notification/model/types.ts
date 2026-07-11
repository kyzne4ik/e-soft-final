import { z } from "zod";

export const createNotificationSchema = z.object({
  userId: z.string().min(1, "Выберите получателя"),
  message: z.string().min(1, "Сообщение обязательно"),
  sendAt: z.string(),
  isSilent: z.boolean(),
});

export type CreateNotificationFormData = z.infer<
  typeof createNotificationSchema
>;
