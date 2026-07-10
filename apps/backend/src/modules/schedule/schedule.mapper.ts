import { LessonDto, LessonsResponse } from "@repo/schemas";

export const lessonMap = (l: LessonDto): LessonsResponse => ({
  id: l.id,
  streamId: l.streamId,
  title: l.title,
  type: l.type,
  host: l.host,
  description: l.description,
  startTime: l.startTime,
  endTime: l.endTime,
  meetingLink: l.meetingLink,
  recordLink: l.recordLink,
  announceSentAt: l.announceSentAt,
  reminderSentAt: l.reminderSentAt,
});

export const scheduleMap = (ls: LessonDto[]): LessonsResponse[] =>
  ls.map(lessonMap);
