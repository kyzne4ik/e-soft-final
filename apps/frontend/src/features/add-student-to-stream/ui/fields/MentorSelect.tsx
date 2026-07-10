import { useQuery } from "@tanstack/react-query";
import { Select } from "@repo/ui/atoms/select";
import { useFormContext, Controller } from "react-hook-form";
import { usersQuery } from "@/entities/user";
import type { AddStudentFormData } from "../../model/types";

export function MentorSelect() {
  const {
    control,
    formState: { errors },
  } = useFormContext<AddStudentFormData>();

  const { data, isLoading } = useQuery(usersQuery({ role: "MENTOR" }));
  const mentors = data?.data.data ?? [];

  const options = mentors
    .filter((mentor) => mentor.profileId != null)
    .map((mentor) => ({
      value: String(mentor.profileId),
      label: `${mentor.lastName} ${mentor.firstName} ${mentor.patronymic ?? ""} (${mentor.email})`,
    }));

  return (
    <Controller
      name="mentorId"
      control={control}
      render={({ field }) => (
        <Select
          label="Ментор"
          required
          placeholder={isLoading ? "Загрузка..." : "Выберите ментора"}
          options={options}
          disabled={isLoading}
          state={errors.mentorId ? "error" : "default"}
          errorMessage={errors.mentorId?.message}
          {...field}
        />
      )}
    />
  );
}
