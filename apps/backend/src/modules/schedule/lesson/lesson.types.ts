import {
  LessonDto,
  CreateLessonRepositoryPayload,
  UpdateLessonRepositoryPayload,
  OverlappingLessonRepositoryPayload,
} from "@repo/schemas";
import { PaginationResponse } from "@types";

export type LessonFilters = {
  streamId?: number | undefined;
  page?: number | undefined;
  limit?: number | undefined;
};

export interface ILessonRepository {
  findAll: (filters?: LessonFilters) => Promise<PaginationResponse<LessonDto>>;
  findById: (id: number) => Promise<LessonDto | null>;
  findOverlapping: (
    addedLesson: OverlappingLessonRepositoryPayload,
    excludeLessonId?: number,
  ) => Promise<LessonDto | null>;
  create: (data: CreateLessonRepositoryPayload) => Promise<LessonDto>;
  update: (
    id: number,
    data: UpdateLessonRepositoryPayload,
  ) => Promise<LessonDto | null>;
  delete: (id: number) => Promise<LessonDto | null>;
  markAnnounceSent: (id: number) => Promise<LessonDto | null>;
  markReminderSent: (id: number) => Promise<LessonDto | null>;
}

export type SchedulableLesson = Pick<
  LessonDto,
  "id" | "startTime" | "announceSentAt" | "reminderSentAt"
>;

export interface ILessonScheduler {
  scheduleLesson: (lesson: SchedulableLesson) => Promise<void>;
  rescheduleLesson: (lesson: SchedulableLesson) => Promise<void>;
  cancelLesson: (lesson: SchedulableLesson) => Promise<void>;
}
