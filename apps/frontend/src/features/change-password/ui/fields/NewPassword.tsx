import { Input } from "@repo/ui/atoms/input";
import { useFormContext, Controller } from "react-hook-form";
import type { ChangePasswordFormData } from "../../model/types";

export function NewPassword() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ChangePasswordFormData>();

  return (
    <Controller
      name="newPassword"
      control={control}
      render={({ field }) => (
        <Input
          label="Новый пароль"
          required
          type="password"
          placeholder="••••••••"
          fullWidth
          state={errors.newPassword ? "error" : "default"}
          errorMessage={errors.newPassword?.message}
          {...field}
        />
      )}
    />
  );
}
