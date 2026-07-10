import { Table } from "@repo/ui/organisms/table";
import css from "./AdminCoursesTable.module.css";
import type { CourseResponse } from "@repo/schemas";
import { UpdateCourseButton } from "@/features/update-course";
import { DeleteCourseButton } from "@/features/delete-course";

interface CourseRowProps {
  course: CourseResponse;
}

export function CourseRow({ course }: CourseRowProps) {
  return (
    <Table.Row>
      <Table.Cell>
        <span className={css.name}>{course.name}</span>
      </Table.Cell>
      <Table.Cell>
        <span className={css.description}>{course.description || "—"}</span>
      </Table.Cell>
      <Table.Cell align="right">
        <span className={css.actions}>
          <UpdateCourseButton course={course} />
          <DeleteCourseButton courseId={course.id} courseName={course.name} />
        </span>
      </Table.Cell>
    </Table.Row>
  );
}
