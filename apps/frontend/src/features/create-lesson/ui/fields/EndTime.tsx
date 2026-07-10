import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateLessonFormData } from "../../model/types";

export function EndTime() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateLessonFormData>();

  return (
    <Controller
      name="endTime"
      control={control}
      render={({ field }) => (
        <Input
          label="Время окончания"
          required
          type="datetime-local"
          fullWidth
          state={errors.endTime ? "error" : "default"}
          errorMessage={errors.endTime?.message}
          {...field}
        />
      )}
    />
  );
}
