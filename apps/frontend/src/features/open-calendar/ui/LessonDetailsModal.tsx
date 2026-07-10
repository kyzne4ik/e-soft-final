import type { LessonsResponse } from "@repo/schemas";
import { Modal } from "@repo/ui/organisms/modal";
import { Icon } from "@repo/ui/atoms/icon";
import { formatLessonDate, formatLessonTime } from "../model/formatters";
import css from "./LessonDetailsModal.module.css";

export interface LessonDetailsModalProps {
  lesson: LessonsResponse;
  onClose: () => void;
}

export function LessonDetailsModal({
  lesson,
  onClose,
}: LessonDetailsModalProps) {
  const start = new Date(lesson.startTime);
  const end = new Date(lesson.endTime);

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={lesson.title}
      sub={lesson.type ?? undefined}
      size="sm"
    >
      <Modal.Body>
        <div className={css.meta}>
          <div className={css.meta_row}>
            <Icon name="calendar" size={16} className={css.meta_icon} />
            <span>{formatLessonDate(start)}</span>
          </div>
          <div className={css.meta_row}>
            <Icon name="clock" size={16} className={css.meta_icon} />
            <span>
              {formatLessonTime(start)}–{formatLessonTime(end)}
            </span>
          </div>
          {lesson.host && (
            <div className={css.meta_row}>
              <Icon name="user" size={16} className={css.meta_icon} />
              <span>
                <span className={css.meta_label}>Ведёт:</span> {lesson.host}
              </span>
            </div>
          )}
        </div>

        {lesson.description && (
          <p className={css.description}>{lesson.description}</p>
        )}

        {lesson.recordLink && (
          <a
            className={css.link_row}
            href={lesson.recordLink}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="play-circle" size={16} />
            Смотреть запись
            <Icon name="external-link" size={13} className={css.link_ext} />
          </a>
        )}
      </Modal.Body>

      {lesson.meetingLink && (
        <Modal.Footer>
          <a
            className={css.cta}
            href={lesson.meetingLink}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="video" size={18} />
            Подключиться к трансляции
          </a>
        </Modal.Footer>
      )}
    </Modal>
  );
}
