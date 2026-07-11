import {
  idParamSchema,
  reviewParamsSchema,
  createReviewPayloadSchema,
  updateReviewPayloadSchema,
} from "@repo/schemas";
import { ForbiddenError } from "@error";
import { FastifyRequest, FastifyReply } from "fastify";
import { ResponseToolKit, getCurrentUser } from "@utils";
import { ReviewService } from "./review.service";
import { IReviewController } from "./review.types";

export class ReviewController implements IReviewController {
  constructor(private reviewService: ReviewService) {}

  create = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const mentorId = this.requireMentorId(req);
    const { id } = idParamSchema.parse(req.params);
    const body = createReviewPayloadSchema.parse(req.body);

    const result = await this.reviewService.createReview(mentorId, id, body);

    return rep
      .status(201)
      .send(ResponseToolKit.success(result, "Ревью создано", 201));
  };

  update = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const mentorId = this.requireMentorId(req);
    const { reviewId } = reviewParamsSchema.parse(req.params);
    const body = updateReviewPayloadSchema.parse(req.body);

    const result = await this.reviewService.updateReview(
      mentorId,
      reviewId,
      body,
    );

    return rep.send(ResponseToolKit.success(result, "Ревью обновлено"));
  };

  private requireMentorId(req: FastifyRequest): number {
    const { user } = getCurrentUser(req);
    if (user.profileId == null)
      throw new ForbiddenError("Профиль ментора не найден");

    return user.profileId;
  }
}
