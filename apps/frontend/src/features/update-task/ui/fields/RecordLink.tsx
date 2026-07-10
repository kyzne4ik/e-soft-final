import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { UpdateTaskFormData } from "../../model/types";

export function RecordLink() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateTaskFormData>();

  return (
    <Controller
      name="recordLink"
      control={control}
      render={({ field }) => (
        <Input
          label="Ссылка на запись"
          type="text"
          placeholder="https://example.com/record"
          fullWidth
          state={errors.recordLink ? "error" : "default"}
          errorMessage={errors.recordLink?.message}
          {...field}
          value={field.value ?? ""}
        />
      )}
    />
  );
}
