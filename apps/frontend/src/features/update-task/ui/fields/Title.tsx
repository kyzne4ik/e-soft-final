import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { UpdateTaskFormData } from "../../model/types";

export function Title() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateTaskFormData>();

  return (
    <Controller
      name="title"
      control={control}
      render={({ field }) => (
        <Input
          label="Название задачи"
          required
          type="text"
          placeholder="Напр. REST API Implementation"
          fullWidth
          state={errors.title ? "error" : "default"}
          errorMessage={errors.title?.message}
          {...field}
        />
      )}
    />
  );
}
