import { z } from "zod";

export const bindTelegramSchema = z.object({
  tgId: z.string().min(1, "Укажите Telegram ID").max(64),
  tgUsername: z.string().min(1, "Укажите username").max(64),
});

export type BindTelegramFormData = z.infer<typeof bindTelegramSchema>;
