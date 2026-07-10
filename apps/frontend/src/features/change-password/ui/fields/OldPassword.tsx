import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { ChangePasswordFormData } from "../../model/types";

export function OldPassword() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ChangePasswordFormData>();

  return (
    <Controller
      name="oldPassword"
      control={control}
      render={({ field }) => (
        <Input
          label="Текущий пароль"
          required
          type="password"
          placeholder="••••••••"
          fullWidth
          state={errors.oldPassword ? "error" : "default"}
          errorMessage={errors.oldPassword?.message}
          {...field}
        />
      )}
    />
  );
}
