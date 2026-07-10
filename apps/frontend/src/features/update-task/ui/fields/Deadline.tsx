import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { UpdateTaskFormData } from "../../model/types";

export function Deadline() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateTaskFormData>();

  return (
    <Controller
      name="deadline"
      control={control}
      render={({ field }) => (
        <Input
          label="Дедлайн"
          required
          type="datetime-local"
          fullWidth
          state={errors.deadline ? "error" : "default"}
          errorMessage={errors.deadline?.message}
          {...field}
        />
      )}
    />
  );
}
