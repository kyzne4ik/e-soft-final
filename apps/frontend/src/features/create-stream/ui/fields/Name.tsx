import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateStreamFormData } from "../../model/types";

export function Name() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateStreamFormData>();

  return (
    <Controller
      name="name"
      control={control}
      render={({ field }) => (
        <Input
          label="Название потока"
          required
          type="text"
          placeholder="Напр. React, поток 3"
          fullWidth
          state={errors.name ? "error" : "default"}
          errorMessage={errors.name?.message}
          {...field}
        />
      )}
    />
  );
}
