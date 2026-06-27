import z from "zod";
import { paginationSchema } from "./common.schema";

export const streamStatusSchema = z.enum([
  "ENROLLING",
  "IN_PROGRESS",
  "FINISHED",
]);

export type StreamStatus = z.infer<typeof streamStatusSchema>;

export const studentStatusSchema = z.enum(["ACTIVE", "GRADUATED", "EXPELLED"]);

export type StudentStatus = z.infer<typeof studentStatusSchema>;

export const submissionStatusSchema = z.enum([
  "NEW",
  "REVIEWING",
  "CHANGES_REQUESTED",
  "ACCEPTED",
  "RESUBMITTED",
  "ARCHIVED",
]);

export type SubmissionStatus = z.infer<typeof submissionStatusSchema>;

export const courseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type CourseDto = z.infer<typeof courseSchema>;
export type CourseResponse = CourseDto;

export const createCoursePayloadSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional(),
});

export type CreateCoursePayload = z.infer<typeof createCoursePayloadSchema>;

export const streamSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  courseId: z.number().int(),
  status: streamStatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type StreamDto = z.infer<typeof streamSchema>;
export type StreamResponse = StreamDto;

export const createStreamPayloadSchema = z.object({
  name: z.string().min(1),
  courseId: z.number().int().positive(),
});

export type CreateStreamPayload = z.infer<typeof createStreamPayloadSchema>;

export const updateStreamStatusPayloadSchema = z.object({
  status: streamStatusSchema,
});

export type UpdateStreamStatusPayload = z.infer<
  typeof updateStreamStatusPayloadSchema
>;

export const addStudentPayloadSchema = z.object({
  studentId: z.number().int().positive(),
});

export type AddStudentPayload = z.infer<typeof addStudentPayloadSchema>;

export const addMentorPayloadSchema = z.object({
  mentorId: z.number().int().positive(),
});

export type AddMentorPayload = z.infer<typeof addMentorPayloadSchema>;

const streamMemberBaseSchema = z.object({
  userId: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string().nullable(),
  email: z.string(),
});

export const streamStudentItemSchema = streamMemberBaseSchema.extend({
  status: studentStatusSchema,
  joinedAt: z.coerce.date().nullable(),
  mentor: streamMemberBaseSchema.nullable(),
});

export type StreamStudentItem = z.infer<typeof streamStudentItemSchema>;

export const streamMentorItemSchema = streamMemberBaseSchema.extend({
  students: z.array(
    streamMemberBaseSchema.extend({ status: studentStatusSchema }),
  ),
});

export type StreamMentorItem = z.infer<typeof streamMentorItemSchema>;

export const streamQuerySchema = z
  .object({
    status: streamStatusSchema.optional(),
    courseId: z.coerce.number().int().positive().optional(),
    mentorId: z.coerce.number().int().positive().optional(),
  })
  .merge(paginationSchema.partial());

export type StreamQuery = z.infer<typeof streamQuerySchema>;

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
export type TaskResponse = TaskDto;

export const createTaskPayloadSchema = z.object({
  streamId: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  repoTemplate: z.string().url(),
  deadline: z.coerce.date(),
});

export type CreateTaskPayload = z.infer<typeof createTaskPayloadSchema>;

export const updateTaskPayloadSchema = createTaskPayloadSchema
  .omit({ streamId: true })
  .partial();

export type UpdateTaskPayload = z.infer<typeof updateTaskPayloadSchema>;

export const taskQuerySchema = z
  .object({
    streamId: z.coerce.number().int().positive().optional(),
  })
  .merge(paginationSchema.partial());

export type TaskQuery = z.infer<typeof taskQuerySchema>;

export const submissionSchema = z.object({
  id: z.number().int(),
  taskId: z.number().int(),
  studentId: z.number().int(),
  repoLink: z.string(),
  status: submissionStatusSchema,
  isActivate: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type SubmissionDto = z.infer<typeof submissionSchema>;
export type SubmissionResponse = SubmissionDto;

export const createSubmissionPayloadSchema = z.object({
  taskId: z.number().int().positive(),
  repoLink: z.string().url(),
});

export type CreateSubmissionPayload = z.infer<
  typeof createSubmissionPayloadSchema
>;

export const updateSubmissionStatusPayloadSchema = z.object({
  status: submissionStatusSchema,
});

export const resubmitPayloadSchema = z.object({
  repoLink: z.string().url().optional(),
});

export type ResubmitPayload = z.infer<typeof resubmitPayloadSchema>;

export type UpdateSubmissionStatusPayload = z.infer<
  typeof updateSubmissionStatusPayloadSchema
>;

export const submissionQuerySchema = z
  .object({
    status: submissionStatusSchema.optional(),
    taskId: z.coerce.number().int().positive().optional(),
    studentId: z.coerce.number().int().positive().optional(),
    mentorId: z.coerce.number().int().positive().optional(),
  })
  .merge(paginationSchema.partial());

export type SubmissionQuery = z.infer<typeof submissionQuerySchema>;

export const reviewSchema = z.object({
  id: z.number().int(),
  submissionId: z.number().int(),
  mentorId: z.number().int(),
  score: z.number().int(),
  comment: z.string(),
  reviewedAt: z.coerce.date(),
});

export type ReviewDto = z.infer<typeof reviewSchema>;
export type ReviewResponse = ReviewDto;

export const createReviewPayloadSchema = z.object({
  submissionId: z.number().int().positive(),
  score: z.number().int().min(0).max(100),
  comment: z.string().min(1),
  status: z.enum(["ACCEPTED", "CHANGES_REQUESTED"]),
});

export type CreateReviewPayload = z.infer<typeof createReviewPayloadSchema>;

export const pingStudentPayloadSchema = z.object({
  message: z.string().min(1),
});

export type PingStudentPayload = z.infer<typeof pingStudentPayloadSchema>;

export const journalCellSchema = z.object({
  taskId: z.number().int(),
  submissionId: z.number().int().nullable(),
  status: submissionStatusSchema.nullable(),
  score: z.number().int().nullable(),
});

export const journalRowSchema = z.object({
  studentId: z.number().int(),
  fullName: z.string(),
  status: studentStatusSchema,
  cells: z.array(journalCellSchema),
});

export const journalResponseSchema = z.object({
  streamId: z.number().int(),
  tasks: z.array(z.object({ id: z.number().int(), title: z.string() })),
  rows: z.array(journalRowSchema),
});

export type JournalResponse = z.infer<typeof journalResponseSchema>;
