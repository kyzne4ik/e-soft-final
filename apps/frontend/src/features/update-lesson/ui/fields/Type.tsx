import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { UpdateLessonFormData } from "../../model/types";

export function Type() {
  const { control } = useFormContext<UpdateLessonFormData>();

  return (
    <Controller
      name="type"
      control={control}
      render={({ field }) => (
        <Input
          label="Тип занятия"
          type="text"
          placeholder="Напр. Лекция, Семинар"
          fullWidth
          {...field}
        />
      )}
    />
  );
}
