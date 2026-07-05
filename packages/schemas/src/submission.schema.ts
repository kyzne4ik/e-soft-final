import z from "zod";
import { paginationSchema } from "./common.schema";

export const submissionStatusSchema = z.enum([
  "NEW",
  "REVIEWING",
  "CHANGES_REQUESTED",
  "ACCEPTED",
  "RESUBMITTED",
]);

export type SubmissionStatus = z.infer<typeof submissionStatusSchema>;

export const submissionSchema = z.object({
  id: z.number().int(),
  taskId: z.number().int(),
  studentId: z.number().int(),
  repoLink: z.string(),
  status: submissionStatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type SubmissionDto = z.infer<typeof submissionSchema>;

export const createSubmissionPayloadSchema = z.object({
  taskId: z.number().int().positive(),
  repoLink: z.string().min(1),
});

export type CreateSubmissionPayload = z.infer<
  typeof createSubmissionPayloadSchema
>;

export const updateSubmissionPayloadSchema = z
  .object({
    repoLink: z.string().min(1),
  })
  .partial();

export type UpdateSubmissionPayload = z.infer<
  typeof updateSubmissionPayloadSchema
>;

export const switchSubmissionStatusPayloadSchema = z.object({
  status: submissionStatusSchema,
});

export type SwitchSubmissionStatusPayload = z.infer<
  typeof switchSubmissionStatusPayloadSchema
>;

export const createSubmissionRepositoryPayloadSchema = z.object({
  taskId: z.number().int(),
  studentId: z.number().int(),
  repoLink: z.string(),
});

export type CreateSubmissionRepositoryPayload = z.infer<
  typeof createSubmissionRepositoryPayloadSchema
>;

export const updateSubmissionRepositoryPayloadSchema = z
  .object({
    repoLink: z.string(),
    status: submissionStatusSchema,
  })
  .partial();

export type UpdateSubmissionRepositoryPayload = z.infer<
  typeof updateSubmissionRepositoryPayloadSchema
>;

export const submissionResponseSchema = z.object({
  id: z.number().int(),
  taskId: z.number().int(),
  studentId: z.number().int(),
  repoLink: z.string(),
  status: submissionStatusSchema,
});

export type SubmissionResponse = z.infer<typeof submissionResponseSchema>;

export const submissionMentorQuerySchema = z
  .object({
    taskId: z.coerce.number().int().positive(),
    studentId: z.coerce.number().int().positive(),
    status: submissionStatusSchema,
  })
  .merge(paginationSchema)
  .partial();

export type SubmissionMentorQuery = z.infer<typeof submissionMentorQuerySchema>;

export const submissionStudentQuerySchema = z
  .object({
    taskId: z.coerce.number().int().positive(),
    studentId: z.coerce.number().int().positive(),
    status: submissionStatusSchema,
  })
  .merge(paginationSchema)
  .partial();

export type SubmissionStudentQuery = z.infer<
  typeof submissionStudentQuerySchema
>;

export const studentPerformanceRowSchema = z.object({
  taskId: z.number().int(),
  title: z.string(),
  status: submissionStatusSchema.nullable(),
  score: z.number().int().nullable(),
  reviewedAt: z.coerce.date().nullable(),
  comment: z.string().nullable(),
});

export type StudentPerformanceRow = z.infer<typeof studentPerformanceRowSchema>;

export const studentPerformanceResponseSchema = z.object({
  averageScore: z.number().nullable(),
  rows: z.array(studentPerformanceRowSchema),
});

export type StudentPerformanceResponse = z.infer<
  typeof studentPerformanceResponseSchema
>;
