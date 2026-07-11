import { TextArea } from "@repo/ui/atoms/textarea";
import { useFormContext, Controller } from "react-hook-form";
import type { UpdateCourseFormData } from "../../model/types";

export function Description() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateCourseFormData>();

  return (
    <Controller
      name="description"
      control={control}
      render={({ field }) => (
        <TextArea
          label="Описание"
          placeholder="Краткое описание курса"
          fullWidth
          rows={3}
          state={errors.description ? "error" : "default"}
          errorMessage={errors.description?.message}
          {...field}
        />
      )}
    />
  );
}
