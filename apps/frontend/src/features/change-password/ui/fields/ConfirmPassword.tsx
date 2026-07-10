import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { ChangePasswordFormData } from "../../model/types";

export function ConfirmPassword() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ChangePasswordFormData>();

  return (
    <Controller
      name="confirmPassword"
      control={control}
      render={({ field }) => (
        <Input
          label="Подтверждение пароля"
          required
          type="password"
          placeholder="••••••••"
          fullWidth
          state={errors.confirmPassword ? "error" : "default"}
          errorMessage={errors.confirmPassword?.message}
          {...field}
        />
      )}
    />
  );
}
