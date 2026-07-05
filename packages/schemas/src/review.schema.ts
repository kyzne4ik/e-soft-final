import z from "zod";

export const reviewSchema = z.object({
  id: z.number().int(),
  submissionId: z.number().int(),
  mentorId: z.number().int(),
  score: z.number().int(),
  comment: z.string(),
  reviewedAt: z.coerce.date(),
});

export type ReviewDto = z.infer<typeof reviewSchema>;

export const reviewResponseSchema = z.object({
  id: z.number().int(),
  submissionId: z.number().int(),
  mentorId: z.number().int(),
  score: z.number().int(),
  comment: z.string(),
});

export type ReviewResponse = z.infer<typeof reviewResponseSchema>;

export const reviewVerdictSchema = z.enum([
  "ACCEPTED",
  "CHANGES_REQUESTED",
  "REVIEWING",
]);

export type ReviewVerdict = z.infer<typeof reviewVerdictSchema>;

export const createReviewPayloadSchema = z.object({
  score: z.number().int(),
  comment: z.string().min(1),
  verdict: reviewVerdictSchema,
});

export type CreateReviewPayload = z.infer<typeof createReviewPayloadSchema>;

export const updateReviewPayloadSchema = z
  .object({
    submissionId: z.number().int(),
    score: z.number().int(),
    comment: z.string().min(1),
    verdict: reviewVerdictSchema,
  })
  .partial();

export type UpdateReviewPayload = z.infer<typeof updateReviewPayloadSchema>;

export const reviewParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
  reviewId: z.coerce.number().int().positive(),
});

export type ReviewParams = z.infer<typeof reviewParamsSchema>;

export const createReviewRepositoryPayloadSchema = z.object({
  submissionId: z.number().int(),
  mentorId: z.number().int(),
  score: z.number().int(),
  comment: z.string(),
  verdict: reviewVerdictSchema,
});

export type CreateReviewRepositoryPayload = z.infer<
  typeof createReviewRepositoryPayloadSchema
>;

export const updateReviewRepositoryPayloadSchema = z
  .object({
    submissionId: z.number().int(),
    score: z.number().int(),
    comment: z.string(),
    verdict: reviewVerdictSchema,
  })
  .partial();

export type UpdateReviewRepositoryPayload = z.infer<
  typeof updateReviewRepositoryPayloadSchema
>;
