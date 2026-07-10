import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { UpdateLessonFormData } from "../../model/types";

export function RecordLink() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateLessonFormData>();

  return (
    <Controller
      name="recordLink"
      control={control}
      render={({ field }) => (
        <Input
          label="Ссылка на запись"
          type="url"
          placeholder="https://youtube.com/..."
          fullWidth
          state={errors.recordLink ? "error" : "default"}
          errorMessage={errors.recordLink?.message}
          {...field}
        />
      )}
    />
  );
}
