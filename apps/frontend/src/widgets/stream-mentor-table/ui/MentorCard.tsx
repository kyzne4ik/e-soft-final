import type {
  StreamMentorWithUserResponse,
  StreamStudentWithUserResponse,
} from "@repo/schemas";
import css from "./StreamMentorTable.module.css";
import { RemoveMentorButton } from "@/features/remove-mentor";
import { MentorCard as MentorCardUI } from "@repo/ui/molecules/mentor-card";
import { fullName, initials, avatarColor } from "@/shared/lib/user-display";

const CHIPS_LIMIT = 6;

interface MentorCardProps {
  streamId: number;
  mentor: StreamMentorWithUserResponse;
  students: StreamStudentWithUserResponse[];
}

export function MentorCard({ streamId, mentor, students }: MentorCardProps) {
  const count = students.length;
  const visible = students.slice(0, CHIPS_LIMIT);
  const rest = count - visible.length;

  const chips =
    count === 0 ? (
      <div className={css.chips_empty}>Нет закреплённых студентов</div>
    ) : (
      <div className={css.chips}>
        {visible.map((student) => (
          <span key={student.studentId} className={css.chip}>
            {fullName(student)}
          </span>
        ))}
        {rest > 0 && (
          <span className={`${css.chip} ${css.chip__more}`}>+{rest} ещё</span>
        )}
      </div>
    );

  return (
    <MentorCardUI
      mentor={{
        name: fullName(mentor),
        initials: initials(mentor),
        color: avatarColor(mentor.mentorId),
        email: mentor.email,
      }}
      studentCount={count}
      chips={chips}
    >
      <RemoveMentorButton
        streamId={streamId}
        mentorId={mentor.mentorId}
        mentorName={fullName(mentor)}
      />
    </MentorCardUI>
  );
}
