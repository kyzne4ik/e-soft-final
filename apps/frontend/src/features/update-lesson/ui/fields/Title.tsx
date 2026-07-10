import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { UpdateLessonFormData } from "../../model/types";

export function Title() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateLessonFormData>();

  return (
    <Controller
      name="title"
      control={control}
      render={({ field }) => (
        <Input
          label="Название занятия"
          required
          type="text"
          placeholder="Напр. Лекция 1: Введение"
          fullWidth
          state={errors.title ? "error" : "default"}
          errorMessage={errors.title?.message}
          {...field}
        />
      )}
    />
  );
}
