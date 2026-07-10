import { useQuery } from "@tanstack/react-query";
import { Select } from "@repo/ui/atoms/select";
import { useFormContext, Controller } from "react-hook-form";
import { coursesQuery } from "@/entities/courses";
import type { UpdateStreamFormData } from "../../model/types";

export function CourseSelect() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateStreamFormData>();

  const { data, isLoading } = useQuery(coursesQuery());
  const courses = data && !Array.isArray(data) ? data.data : [];

  const options = courses.map((course) => ({
    value: String(course.id),
    label: course.name,
  }));

  return (
    <Controller
      name="courseId"
      control={control}
      render={({ field }) => (
        <Select
          label="Курс"
          required
          placeholder={isLoading ? "Загрузка..." : "Выберите курс"}
          options={options}
          disabled={isLoading}
          state={errors.courseId ? "error" : "default"}
          errorMessage={errors.courseId?.message}
          {...field}
        />
      )}
    />
  );
}
