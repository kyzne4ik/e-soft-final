import { Input } from "@repo/ui/atoms/input";
import type { ActivateFormData } from "../../model/types";
import { useFormContext, Controller } from "react-hook-form";

export function Password() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ActivateFormData>();

  return (
    <Controller
      name="password"
      control={control}
      render={({ field }) => (
        <Input
          label="Пароль"
          required
          type="password"
          placeholder="••••••••"
          fullWidth
          state={errors.password ? "error" : "default"}
          errorMessage={errors.password?.message}
          {...field}
        />
      )}
    />
  );
}
