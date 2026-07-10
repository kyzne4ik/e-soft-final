import { Table } from "@repo/ui/organisms/table";
import { Avatar } from "@repo/ui/atoms/avatar";
import css from "./StreamStudentTable.module.css";
import { RemoveStudentButton } from "@/features/remove-student";
import type { StreamStudentWithUserResponse } from "@repo/schemas";
import { ChangeStudentStatusSelect } from "@/features/change-student-status";
import { fullName, initials, avatarColor } from "@/shared/lib/user-display";

interface StudentRowProps {
  streamId: number;
  student: StreamStudentWithUserResponse;
  mentorName: string | undefined;
}

export function StudentRow({ streamId, student, mentorName }: StudentRowProps) {
  return (
    <Table.Row>
      <Table.Cell>
        <span className={css.student}>
          <Avatar
            person={{
              name: fullName(student),
              initials: initials(student),
              color: avatarColor(student.studentId),
            }}
            size={30}
          />
          <span className={css.name}>{fullName(student)}</span>
        </span>
      </Table.Cell>
      <Table.Cell>
        {student.mentorId != null ? (
          (mentorName ?? "—")
        ) : (
          <span className={css.no_mentor}>без ментора</span>
        )}
      </Table.Cell>
      <Table.Cell>
        <ChangeStudentStatusSelect
          streamId={streamId}
          studentId={student.studentId}
          currentStatus={student.status}
        />
      </Table.Cell>
      <Table.Cell align="right">
        <RemoveStudentButton
          streamId={streamId}
          studentId={student.studentId}
          studentName={fullName(student)}
        />
      </Table.Cell>
    </Table.Row>
  );
}
