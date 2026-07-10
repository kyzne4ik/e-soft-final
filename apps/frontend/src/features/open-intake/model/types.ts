import { z } from "zod";

export const openIntakeSchema = z.object({
  expiresIn: z.string().min(1, "Выберите срок действия"),
});

export type OpenIntakeFormData = z.infer<typeof openIntakeSchema>;
