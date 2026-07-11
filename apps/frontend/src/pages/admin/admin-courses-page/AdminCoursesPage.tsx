import { Flex } from "@repo/ui/layouts/flex";
import { AdminCoursesTable } from "@/widgets/admin-courses-table";
import { CreateCourseButton } from "@/features/create-course";
import css from "./AdminCoursesPage.module.css";

export default function AdminCoursesPage() {
  return (
    <div className={css.root}>
      <Flex justify="end" gap="2" max>
        <CreateCourseButton />
      </Flex>
      <div className={css.page}>
        <AdminCoursesTable />
      </div>
    </div>
  );
}
