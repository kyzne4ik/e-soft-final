import { Icon } from "@repo/ui/atoms/icon";
import css from "./ScheduleTable.module.css";
import { Table } from "@repo/ui/organisms/table";
import type { LessonsResponse } from "@repo/schemas";
import { formatDate, formatTime } from "../model/formatters";
import { UpdateLessonButton } from "@/features/update-lesson";
import { DeleteLessonButton } from "@/features/delete-lesson";

interface LessonRowProps {
  lesson: LessonsResponse;
}

export function LessonRow({ lesson }: LessonRowProps) {
  return (
    <Table.Row>
      <Table.Cell>
        <span className={css.title}>{lesson.title}</span>
      </Table.Cell>
      <Table.Cell>
        <span className={css.muted}>{formatDate(lesson.startTime)}</span>
      </Table.Cell>
      <Table.Cell>
        <span className={css.muted}>
          {formatTime(lesson.startTime)} – {formatTime(lesson.endTime)}
        </span>
      </Table.Cell>
      <Table.Cell>
        {lesson.meetingLink ? (
          <a
            href={lesson.meetingLink}
            target="_blank"
            rel="noreferrer"
            className={css.link}
          >
            <Icon name="video" size={14} />
            Подключиться
          </a>
        ) : (
          <span className={css.muted}>—</span>
        )}
      </Table.Cell>
      <Table.Cell>
        {lesson.recordLink ? (
          <a
            href={lesson.recordLink}
            target="_blank"
            rel="noreferrer"
            className={css.link}
          >
            <Icon name="circle-play" size={14} />
            Запись
          </a>
        ) : (
          <span className={css.muted}>—</span>
        )}
      </Table.Cell>
      <Table.Cell align="right">
        <span className={css.actions}>
          <UpdateLessonButton lesson={lesson} />
          <DeleteLessonButton lessonId={lesson.id} lessonTitle={lesson.title} />
        </span>
      </Table.Cell>
    </Table.Row>
  );
}
