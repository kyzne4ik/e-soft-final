import {
  CreateLessonPayload,
  LessonsResponse,
  UpdateLessonPayload,
} from "@repo/schemas";
import { enqueueTelegram } from "@bull";
import { PaginationResponse } from "@types";
import { ConflictError, NotFoundError } from "@error";
import { lessonMap, scheduleMap } from "./schedule.mapper";
import { BadRequestError } from "@error/bad-request.error";
import { LessonScheduler } from "./lesson/lesson.scheduler";
import { LessonRepository } from "./lesson/lesson.repository";
import { IScheduleService, ScheduleFilters } from "./schedule.types";

export class ScheduleService implements IScheduleService {
  constructor(
    private lessonRepo: LessonRepository,
    private lessonScheduler: LessonScheduler,
  ) {}

  async getSchedule(
    filters?: ScheduleFilters,
  ): Promise<PaginationResponse<LessonsResponse>> {
    const lessons = await this.lessonRepo.findAll(filters);

    return {
      ...lessons,
      data: scheduleMap(lessons.data),
    };
  }

  async getLesson(id: number): Promise<LessonsResponse> {
    const lesson = await this.lessonRepo.findById(id);

    if (!lesson) throw new NotFoundError("Занятие не найдено");

    return lessonMap(lesson);
  }

  async createLesson(data: CreateLessonPayload): Promise<LessonsResponse> {
    const isInvalidRange = data.endTime <= data.startTime;
    if (isInvalidRange)
      throw new BadRequestError("Время окончания должно быть позже начала");

    const conflict = await this.lessonRepo.findOverlapping(data);
    if (conflict)
      throw new ConflictError("Занятие пересекается с уже существующим");

    const lesson = await this.lessonRepo.create(data);
    await this.lessonScheduler.scheduleLesson(lesson);

    return lessonMap(lesson);
  }

  async updateLesson(
    id: number,
    data: UpdateLessonPayload,
  ): Promise<LessonsResponse> {
    const existing = await this.lessonRepo.findById(id);
    if (!existing) throw new NotFoundError("Занятие не найдено");

    const wasAnnounced = !!existing.announceSentAt;

    const streamId = data.streamId ?? existing.streamId;
    const startTime = data.startTime ?? existing.startTime;
    const endTime = data.endTime ?? existing.endTime;

    const isInvalidRange = endTime <= startTime;
    if (isInvalidRange)
      throw new BadRequestError("Время окончания должно быть позже начала");

    const conflict = await this.lessonRepo.findOverlapping(
      {
        streamId,
        startTime,
        endTime,
      },
      id,
    );
    if (conflict)
      throw new ConflictError("Занятие пересекается с уже существующим");

    const lesson = await this.lessonRepo.update(id, data);
    if (!lesson) throw new NotFoundError("Занятие не найдено");

    if (data.startTime) {
      await this.lessonScheduler.rescheduleLesson(lesson);

      if (wasAnnounced && lesson.startTime > new Date())
        await enqueueTelegram({
          kind: "lesson-reschedule",
          lessonId: lesson.id,
        });
    }

    return lessonMap(lesson);
  }

  async deleteLesson(id: number): Promise<boolean> {
    const lesson = await this.lessonRepo.delete(id);
    if (!lesson) return false;

    await this.lessonScheduler.cancelLesson(lesson);

    if (lesson.announceSentAt && lesson.startTime > new Date())
      await enqueueTelegram({
        kind: "lesson-cancel",
        streamId: lesson.streamId,
        title: lesson.title,
        startTime: lesson.startTime,
      });

    return true;
  }
}
