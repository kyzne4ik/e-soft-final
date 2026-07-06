import { TelegramJob } from "@repo/schemas";
import { TelegramService } from "@telegram";
import { LessonTemplate } from "../templates";
import { isTerminalTelegramError } from "../telegram.errors";
import { LessonRepository } from "@modules/schedule/lesson/lesson.repository";
import { StreamTelegramRepository } from "@modules/lms/stream/stream-telegram/stream-telegram.repository";
import { UnrecoverableError } from "bullmq";
import { GrammyError } from "grammy";

export class LessonDelivery {
  constructor(
    private lessonRepo: LessonRepository,
    private streamTelegramRepo: StreamTelegramRepository,
    private telegramService: TelegramService,
  ) {}

  async deliverAnnounce(lessonId: number): Promise<void> {
    const lesson = await this.lessonRepo.findById(lessonId);
    if (!lesson) return;
    if (lesson.announceSentAt) return;

    const streamTelegram = await this.streamTelegramRepo.findByStreamId(
      lesson.streamId,
    );
    if (
      !streamTelegram ||
      !streamTelegram.chatId ||
      !streamTelegram.announceThreadId
    )
      return;

    try {
      await this.telegramService.sendToTopic(
        streamTelegram.chatId,
        streamTelegram.announceThreadId,
        LessonTemplate.announce(lesson),
      );
      await this.lessonRepo.markAnnounceSent(lesson.id);
    } catch (e) {
      if (isTerminalTelegramError(e)) {
        throw new UnrecoverableError(
          e instanceof GrammyError ? e.description : "terminal telegram error",
        );
      }
      throw e;
    }
  }

  async deliverReminder(lessonId: number): Promise<void> {
    const lesson = await this.lessonRepo.findById(lessonId);
    if (!lesson) return;
    if (lesson.reminderSentAt) return;

    const streamTelegram = await this.streamTelegramRepo.findByStreamId(
      lesson.streamId,
    );
    if (
      !streamTelegram ||
      !streamTelegram.chatId ||
      !streamTelegram.announceThreadId
    )
      return;

    try {
      await this.telegramService.sendToTopic(
        streamTelegram.chatId,
        streamTelegram.announceThreadId,
        LessonTemplate.reminder(lesson),
      );
      await this.lessonRepo.markReminderSent(lesson.id);
    } catch (e) {
      if (isTerminalTelegramError(e)) {
        throw new UnrecoverableError(
          e instanceof GrammyError ? e.description : "terminal telegram error",
        );
      }
      throw e;
    }
  }

  async deliverReschedule(lessonId: number): Promise<void> {
    const lesson = await this.lessonRepo.findById(lessonId);
    if (!lesson) return;

    const streamTelegram = await this.streamTelegramRepo.findByStreamId(
      lesson.streamId,
    );
    if (
      !streamTelegram ||
      !streamTelegram.chatId ||
      !streamTelegram.announceThreadId
    )
      return;

    try {
      await this.telegramService.sendToTopic(
        streamTelegram.chatId,
        streamTelegram.announceThreadId,
        LessonTemplate.reschedule(lesson),
      );
    } catch (e) {
      if (isTerminalTelegramError(e)) {
        throw new UnrecoverableError(
          e instanceof GrammyError ? e.description : "terminal telegram error",
        );
      }
      throw e;
    }
  }

  async deliverCancel(
    job: Extract<TelegramJob, { kind: "lesson-cancel" }>,
  ): Promise<void> {
    const streamTelegram = await this.streamTelegramRepo.findByStreamId(
      job.streamId,
    );
    if (
      !streamTelegram ||
      !streamTelegram.chatId ||
      !streamTelegram.announceThreadId
    )
      return;

    try {
      await this.telegramService.sendToTopic(
        streamTelegram.chatId,
        streamTelegram.announceThreadId,
        LessonTemplate.cancel({ title: job.title, startTime: job.startTime }),
      );
    } catch (e) {
      if (isTerminalTelegramError(e)) {
        throw new UnrecoverableError(
          e instanceof GrammyError ? e.description : "terminal telegram error",
        );
      }
      throw e;
    }
  }
}
