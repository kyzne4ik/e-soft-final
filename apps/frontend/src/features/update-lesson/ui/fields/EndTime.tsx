import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { UpdateLessonFormData } from "../../model/types";

export function EndTime() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateLessonFormData>();

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
