import { TextArea } from "@repo/ui/atoms/textarea";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateTaskFormData } from "../../model/types";

export function Description() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateTaskFormData>();

  return (
    <Controller
      name="description"
      control={control}
      render={({ field }) => (
        <TextArea
          label="Описание"
          required
          placeholder="Подробное описание задачи"
          fullWidth
          rows={4}
          state={errors.description ? "error" : "default"}
          errorMessage={errors.description?.message}
          {...field}
        />
      )}
    />
  );
}
