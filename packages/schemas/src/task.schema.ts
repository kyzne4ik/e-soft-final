import z from "zod";
import { paginationSchema } from "./common.schema";

export const taskSchema = z.object({
  id: z.number().int(),
  streamId: z.number().int(),
  title: z.string(),
  description: z.string(),
  repoTemplate: z.string(),
  deadline: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type TaskDto = z.infer<typeof taskSchema>;

export const taskResponseSchema = z.object({
  id: z.number().int(),
  streamId: z.number().int(),
  title: z.string(),
  description: z.string(),
  repoTemplate: z.string(),
  deadline: z.coerce.date(),
});

export type TaskResponse = z.infer<typeof taskResponseSchema>;

export const createTaskPayloadSchema = z.object({
  streamId: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  repoTemplate: z.string().min(1),
  deadline: z.coerce.date(),
});

export type CreateTaskPayload = z.infer<typeof createTaskPayloadSchema>;

export const updateTaskPayloadSchema = createTaskPayloadSchema
  .omit({ streamId: true })
  .partial();

export type UpdateTaskPayload = z.infer<typeof updateTaskPayloadSchema>;

export const createTaskRepositoryPayloadSchema = createTaskPayloadSchema;

export type CreateTaskRepositoryPayload = z.infer<
  typeof createTaskRepositoryPayloadSchema
>;

export const updateTaskRepositoryPayloadSchema = updateTaskPayloadSchema;

export type UpdateTaskRepositoryPayload = z.infer<
  typeof updateTaskRepositoryPayloadSchema
>;

export const taskQuerySchema = z
  .object({
    streamId: z.coerce.number().int().positive(),
  })
  .merge(paginationSchema)
  .partial();

export type TaskQuery = z.infer<typeof taskQuerySchema>;
