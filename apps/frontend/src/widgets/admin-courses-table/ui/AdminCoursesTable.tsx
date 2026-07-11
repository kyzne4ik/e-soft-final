import {
  CoursesTableHead,
  COURSES_TABLE_COLSPAN,
} from "./AdminCoursesTableHead";
import { CourseRow } from "./AdminCourseRow";
import css from "./AdminCoursesTable.module.css";
import { Table } from "@repo/ui/organisms/table";
import { ErrorBoundary } from "react-error-boundary";
import { TABLE_DEFAULT_LIMIT } from "@/shared/consts";
import { Pagination } from "@repo/ui/atoms/pagination";
import { ErrorHandler } from "@/shared/ui/error-handler";
import { useCoursesQuery } from "../model/useCoursesQuery";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { CoursesTableSkeleton } from "./AdminCoursesTableSkeleton";

export function AdminCoursesTable() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={ErrorHandler}>
          <BaseAdminCoursesTable />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function BaseAdminCoursesTable() {
  const { courses, meta, isLoading, isFetching, setPage } = useCoursesQuery();

  if (isLoading) return <CoursesTableSkeleton />;

  return (
    <div
      className={`${css.wrapper} ${css.fadeIn}`}
      style={{
        opacity: isFetching ? 0.6 : 1,
        transition: "opacity 0.15s ease",
      }}
    >
      <Table>
        <CoursesTableHead />
        <Table.Body>
          {courses.length === 0 ? (
            <Table.Empty
              colSpan={COURSES_TABLE_COLSPAN}
              icon="book-open"
              message="Курсы не найдены"
            />
          ) : (
            courses.map((course) => (
              <CourseRow key={course.id} course={course} />
            ))
          )}
        </Table.Body>
      </Table>
      {meta && meta.total > TABLE_DEFAULT_LIMIT && (
        <Pagination
          meta={{
            page: meta.page,
            limit: meta.limit,
            total: meta.total,
            totalPages: Math.ceil(meta.total / meta.limit),
          }}
          onChange={setPage}
          className={css.pagination}
        />
      )}
    </div>
  );
}
