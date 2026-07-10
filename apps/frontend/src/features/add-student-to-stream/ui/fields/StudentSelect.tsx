import { useQuery } from "@tanstack/react-query";
import { Select } from "@repo/ui/atoms/select";
import { useFormContext, Controller } from "react-hook-form";
import { usersQuery } from "@/entities/user";
import type { AddStudentFormData } from "../../model/types";

export function StudentSelect() {
  const {
    control,
    formState: { errors },
  } = useFormContext<AddStudentFormData>();

  const { data, isLoading } = useQuery(usersQuery({ role: "STUDENT" }));
  const students = data?.data.data ?? [];

  const options = students
    .filter((student) => student.profileId != null)
    .map((student) => ({
      value: String(student.profileId),
      label: `${student.lastName} ${student.firstName} ${student.patronymic ?? ""} (${student.email})`,
    }));

  return (
    <Controller
      name="studentId"
      control={control}
      render={({ field }) => (
        <Select
          label="Студент"
          required
          placeholder={isLoading ? "Загрузка..." : "Выберите студента"}
          options={options}
          disabled={isLoading}
          state={errors.studentId ? "error" : "default"}
          errorMessage={errors.studentId?.message}
          {...field}
        />
      )}
    />
  );
}
