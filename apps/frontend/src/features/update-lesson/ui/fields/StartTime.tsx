import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { UpdateLessonFormData } from "../../model/types";

export function StartTime() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateLessonFormData>();

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
