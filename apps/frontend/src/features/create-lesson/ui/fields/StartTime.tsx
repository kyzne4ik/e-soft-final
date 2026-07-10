import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateLessonFormData } from "../../model/types";

export function StartTime() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateLessonFormData>();

  return (
    <Controller
      name="startTime"
      control={control}
      render={({ field }) => (
        <Input
          label="Время начала"
          required
          type="datetime-local"
          fullWidth
          state={errors.startTime ? "error" : "default"}
          errorMessage={errors.startTime?.message}
          {...field}
        />
      )}
    />
  );
}
